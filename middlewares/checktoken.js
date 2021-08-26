const dotenv = require('dotenv');
const mysql = require('mysql2');

// Reads .env file
dotenv.config();

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

// Испоьзуется для проверки токенов по куки файлу (в основном для предостваления фич авторезированным юзерам)
function checkNoTokenCookie(req, res, next) {
    con.query(`SELECT token FROM accounts WHERE token='${req.cookies.access_token}'`, (err, result) => {
        if (err) throw err;
        if (result[0] !== undefined) {
            return res.status(403).send('403 error - you have already sign in');
        } else {
            next();
        }
   });
}

function checkTokenCookie(req, res, next) {
    con.query(`SELECT token FROM accounts WHERE token='${req.cookies.access_token}'`, (err, result) => {
        if (err) throw err;
        if (result[0] === undefined) {
            return res.status(401).send('401 error - you are not logged in to access');
        } else {
            next();
        }
   });
}

function checkTokenDBToURL(req, res, next) {
    con.query(`SELECT token FROM accounts WHERE token='${req.query.token}'`, (err, result) => {
        if (err) throw err;
        if (result[0] === undefined) {
            return res.status(412).send('412 error - JSON Web Token is unacceptable');
        } else {
            next(req.query.token);
        }
   });
}

module.exports = {
    checkNoTokenCookie,
    checkTokenCookie, 
    checkTokenDBToURL
};