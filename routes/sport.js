const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const { checkTokenCookie } = require('../middlewares/checktoken');
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
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

const jsonParser = express.json();

// Default middleware function
router.use(function sportType(req, res, next) {
    next();
});

router.get('', checkTokenCookie, (req, res) => {
    res.render('sport');
});

let sports = ['Баскетбол', 'Футбол', 'Волейбол', 'Любой'];
let levels = ['Профи', 'Хорошо', 'Средне', 'Плохо', 'Ужасно', 'Любой'];

// Для сообщения обеих и более сторон использовать уже созданные сервисы по типу телеграмма и других соц. сетей
// На submitpref перезагружаьт страницу (динамически добавлять элементы)
router.post('', jsonParser, (req, res) => {
    
    if (req.body.startSettings) {
        // Смотрим какие фильтры уже есть
        con.query(`SELECT sport, game_level, user_name, acc_image, age FROM add_info WHERE token='${req.cookies.access_token}'`, (err, result) => {
            if (err) throw err;
            if (result !== undefined) {
                if (result[0].sport !== undefined && result[0].game_level !== undefined) {
                    if (result[0].game_level == 'Любой') {
                        con.query(`SELECT sport, game_level, user_name, acc_image, age FROM add_info WHERE token!='${req.cookies.access_token}' AND sport='${result[0].sport}'`, (err, result1) => {
                            if (err) throw err;
                            if (result1[0] === undefined) {
                                res.json({ sport: result[0].sport, level: result[0].game_level, name: result[0].user_name, avatar: result[0].acc_image, age: result[0].age, sportType: req.query.type, error: 'Нет совпадений' });
                            } else {
                                res.json({ sport: result[0].sport, level: result[0].game_level, name: result[0].user_name, avatar: result[0].acc_image, age: result[0].age, sportType: req.query.type, sport1: result1[0].sport, level1: result1[0].game_level, name1: result1[0].user_name, avatar1: result1[0].acc_image, age1: result1[0].age, sportType1: req.query.type })
                            }
                        });
                    } else {
                        con.query(`SELECT sport, game_level, user_name, acc_image, age FROM add_info WHERE token!='${req.cookies.access_token}' AND sport='${result[0].sport}' AND game_level='${result[0].game_level}'`, (err, result1) => {
                            if (err) throw err;
                            if (result1[0] === undefined) {
                                res.json({ sport: result[0].sport, level: result[0].game_level, name: result[0].user_name, avatar: result[0].acc_image, age: result[0].age, sportType: req.query.type, error: 'Нет совпадений' });
                            } else {
                                res.json({ sport: result[0].sport, level: result[0].game_level, name: result[0].user_name, avatar: result[0].acc_image, age: result[0].age, sportType: req.query.type, sport1: result1[0].sport, level1: result1[0].game_level, name1: result1[0].user_name, avatar1: result1[0].acc_image, age1: result1[0].age, sportType1: req.query.type })
                            }
                        });
                    }
                } else {
                    res.json({ sport: result[0].sport, level: result[0].game_level, name: result[0].user_name, avatar: result[0].acc_image, age: result[0].age, sportType: req.query.type });
                }
            } else {
                res.json({error: 'Ваши фильтры не настроены либо с ними что-то не так'});
            }
        })
    }

    if (req.body.sport && req.body.level) {
        con.query(`UPDATE add_info SET preferences = JSON_OBJECT('sport', '${req.body.sport}', 'level', '${req.body.level}') WHERE token='${req.cookies.access_token}'`, (err, result) => {
            if (err) throw err;
        })
    }
    
    if (req.body.pref) {
        res.json({ sports: sports, levels: levels, SportType: req.query.type });
    }
    
    if (req.body.submitpref) {
        res.json({ sports: sports, levels: levels });
    }
})

module.exports = router;
