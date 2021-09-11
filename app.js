// Import
const { checkNoTokenCookie, checkTokenCookie, checkTokenDBToURL } = require('./middlewares/checktoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sport = require('./routes/sport');
const auth = require('./routes/auth');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
// Reads .env file
dotenv.config()

// Init variables
const app = express();
const jsonParser = express.json();
const port = 8080;

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

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/sport', sport);
app.use('/authorization', auth);
app.use(cookieParser());

// Set views
app.set('views', './views');
app.set('view engine', 'ejs');

// Send information from server to client
// When we come to the site we render home.ejs file
app.get('', (req, res) => {
     res.render('home');
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

app.get('/account', checkTokenCookie, (req, res) => {
     res.render('account');
})

app.post('/account', jsonParser, (req, res) => {
     if (req.body.name) {
          con.query(`UPDATE add_info SET user_name='${req.body.name}', acc_image='${req.body.avatar}', age=${req.body.age} WHERE token='${req.cookies.access_token}'`, (err, result) => {
               if (err) throw err;
          });
     }
})
function toBD(req, res, next) {
     console.log(req.query)
     con.query(`INSERT INTO accounts (email, password, token) VALUES ('${req.query.e}', '${req.query.f}', '${req.query.token}')`, function (err, result) {
          if (err) throw err;
          con.query(`INSERT INTO add_info (token) VALUES ('${req.query.token}')`, (err, result) => {
               if (err) throw err;
               con.query(`UPDATE add_info SET preferences=JSON_OBJECT('sport', '', 'level', '') WHERE token='${req.query.token}'`, (err, result) => {
                    if (err) throw err;
                    next()
               })
          })
     })
}
app.get('/confirm', toBD, checkNoTokenCookie, checkTokenDBToURL, (token, req, res, next) => {
     res.cookie('access_token', token, { maxAge: 3600000 * 8, path: 'http://localhost:8080/', httpOnly: true });
     res.redirect('/');
})

// Listen on port 8080
app.listen(port);