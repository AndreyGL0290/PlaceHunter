const { checkNoTokenCookie } = require('../middlewares/checktoken');
const passwordValidator = require('password-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const validator = require('validator');
const sign = require('jwt-encode');
const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const router = express.Router();
const mysql = require('mysql2');

const jsonParser = express.json();
const saltRounds = 10;

let password;
let email;

// Reads .env file
dotenv.config()

// Mysql server configuration
const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "userinfo"
});

con.connect(function (err) {
    if (err) throw err;
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

const schema = new passwordValidator();

schema.is().min(8)
    .is().max(100)
    .has().not().uppercase()
    .has().digits(2)
    .has().not().spaces()

const schemaCheck = {
    'digits': "Minimum 2 digits",
    'min': "Minimum 8 characters",
    'max': "Maximum 100 characters",
    'spaces': "You should not have spaces",
    'uppercase': "You should not have uppercase characters"
}

// Static Files
router.use(express.static('public'));
router.use('/css', express.static(__dirname + 'public/css'));
router.use('/img', express.static(__dirname + 'public/img'));
router.use('/js', express.static(__dirname + 'public/js'));
router.use(bodyParser.urlencoded({ extended: true }));

// Setting parser
router.use(cookieParser());

// Default middleware function
router.use(function q(req, ers, next) {
    next();
});

router.get('/registration', (req, res) => {
    res.render('registration');
})

router.post('/registration', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    email = req.body.email;
    password = req.body.password1;
    if (validator.isEmail(email)) {
        if (schema.validate(password)) {
            if (req.body.password1 == req.body.password2) {
                // Pushes heshed password and email to BD
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        con.query(`SELECT email token FROM accounts WHERE email='${email}'`, function (err, result) {
                            if (err) throw err;

                            if (result[0] == undefined) {
                                const jwt = sign({ email: email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
                                con.query(`INSERT INTO accounts (email, password, token) VALUES ('${email}', '${hash}', '${jwt}')`, function (err, result) {
                                    if (err) throw err;
                                    con.query(`INSERT INTO add_info (token) VALUES ('${jwt}')`, (err, result) => {
                                        if (err) throw err;
                                        con.query(`UPDATE add_info SET preferences=JSON_OBJECT('sport', '', 'level', '') WHERE token='${jwt}'`, (err, result) => {
                                            if (err) throw err;
                                        })
                                    })
                                    res.json('')
                                    const mailOptions = {
                                        from: process.env.USER,
                                        to: email,
                                        subject: 'Sportbook regestration',
                                        html: `<style>.button {display:inline-block;position:relative;color:black;background-color:rgba(0, 0, 0, 0);text-decoration:none;text-transform:uppercase;border:2px solid black;transition:250ms;width:280px;height:40px;line-height:40px;text-align:center;}</style>
                                                  <p>Ваша электронная почта была использована для регестрации на сайте sportbook.com.<br>
                                                       Если это не вы пытаетесь зарегестрироваться на нашем сайте, то проигнорируте это письмо<br>
                                                       Если это вы хотите зарегестрироваться на нашем сайте, то нажмите кнопку "Окончить регестрацию"</p>
                                                       <a class='button' href='http://localhost:8080/confirm?token=${jwt}'>Окончить регестрацию</a>`,
                                    }
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                        }
                                    });
                                })

                            } else {
                                if (result[0].token === undefined || result[0].token === null) res.json('Вам уже было отправлено письмо');
                                else { res.json('К этой почте уже привязан аккаунт') }
                            }
                        });
                    });
                });
            } else {
                res.json('Пароли не совпадают');
            }
        } else {
            let errorList = schema.validate(password, { list: true });
            let errorText;
            for (let props in schemaCheck) {
                errorList.forEach(function(item){
                    if (item == props) {
                        errorText = schemaCheck[props];
                    }
                })
            }
            res.json(errorText);
        }
    } else {
        res.json('Не валидная почта');
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    email = req.body.email;
    password = req.body.password1;
    con.query(`SELECT email, password, token FROM accounts WHERE email='${email}'`, function (err, result) {
        if (err) throw err;
        if (result[0] !== undefined && result[0] !== null) {
            bcrypt.compare(password, result[0].password, function (err, result1) {
                if (err) throw err;
                if (result1) {
                    res.cookie('access_token', result[0].token, { maxAge: 3600000 * 8, httpOnly: true });
                    res.json('');
                } else {
                    res.json('Неправилная почта или пароль');
                }
            });
        } else {
            res.json('Неправилная почта или пароль');
        }
    });
})

module.exports = router;
