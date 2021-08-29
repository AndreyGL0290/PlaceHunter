const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const router = express.Router();
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

// Static Files
router.use(express.static('public'));
router.use('/css', express.static(__dirname + 'public/css'));
router.use('/img', express.static(__dirname + 'public/img'));
router.use('/js', express.static(__dirname + 'public/js'));

// Default middleware function
router.use(function sportType(req, res, next) {
    next();
});

router.get('/', function (req, res) {
    res.render('sport');
});

router.post('/', function (req, res) {
    con.query(`SELECT preferences FROM add_info WHERE token='${req.cookies.access_token}'`, (err, result) => {
        if (err) throw err;
        res.json(result[0])
        if (result !== undefined) {
            console.log(result)
            res.json(result.length);
        }
    })
})

module.exports = router;
