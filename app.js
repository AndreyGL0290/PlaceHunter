// Import
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sign = require('jwt-encode');
const mysql = require('mysql2');
const { checkNoTokenCookie, checkTokenCookie, checkTokenDBToURL } = require('./middlewares/checktoken');
const sportRouter = require('./sportRouter');

// Reads .env file
dotenv.config()

// Init variables
const app = express();
const jsonParser = express.json();
const saltRounds = 10;
const port = 8080;
let password;
let email;

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

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/sport', sportRouter);
app.use(cookieParser());

// Set views
app.set('views', './views');
app.set('view engine', 'ejs');

// basic instance that helps to 

// Send information from server to client
// When we come to the site we render home.ejs file
app.get('', (req, res) => {
     res.render('home');
})

app.get('/account', checkTokenCookie, (req, res) => {
     res.render('account');
})

app.get('/registration', checkNoTokenCookie, (req, res) => {
     res.render('registration');
})

app.get('/login', checkNoTokenCookie, (req, res) => {
     res.render('login');
})

app.get('/confirm', checkNoTokenCookie, checkTokenDBToURL, (token, req, res, next) => {
     res.cookie('access_token', token, { maxAge: 3600000 * 8, path: 'http://localhost:8080/', httpOnly: true });
     res.render('confirm');
})

// Getting information from client and also send him some response
// Home page
app.post('', jsonParser, (req, res) => {
     if (req.body.action == 'clear') {
          res.clearCookie('access_token', { httpOnly: true })
     }
     con.query(`SELECT token FROM accounts WHERE token='${req.cookies.access_token}'`, (err, result) => {
          if (err) throw err;
          if (result[0] !== undefined) {
               if (result[0].token == req.cookies.access_token) {
                    res.json('');
               } else {
                    res.json('Сперва вам нужно войти в свой аккаунт');
               }
          } else {
               res.json('Сперва вам нужно войти в свой аккаунт');
          }
     });
})

// Sign up page
app.post('/registration', jsonParser, (req, res) => {
     if (!req.body) return res.sendStatus(400);
     email = req.body.email;
     password = req.body.password1;
     if (email != '') {
          if (password || false) {
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

                                             })
                                             res.json('')
                                             const mailOptions = {
                                                  from: 'andreygl2014@gmail.com',
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
               res.json('Введите пароль');
          }
     } else {
          res.json('Введите почту');
     }
});

// Log in page
app.post('/login', jsonParser, function (req, res) {
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

app.post('/account', (req, res) => {

})

// Listen on port 8080
app.listen(port);