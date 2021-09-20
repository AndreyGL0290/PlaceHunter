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

// Симуляция БД
let sports = ['Баскетбол', 'Футбол', 'Волейбол', 'Любой'];
let levels = ['Профи', 'Хорошо', 'Средне', 'Плохо', 'Ужасно', 'Любой'];

let cities = ['Новосибирск']
let districts = ['Дзержинский район', 'Железнодорожный район', 'Заельлцовский район', 'Калининский район', 'Кировский район', 'Ленинский район', 'Октябрьский район', 'Первомайский район', 'Советский район', 'Центральный район']

// Для сообщения обеих и более сторон использовать уже созданные сервисы по типу телеграмма и других соц. сетей
// На submitpref перезагружаьт страницу (динамически добавлять элементы)
router.post('', jsonParser, (req, res) => {
    // Ответ на самый первый запрос, который запрашивает списки вариантов
    if (req.body.getLists) {
        return res.json({ sports: sports, levels: levels, cities: cities, districts: districts });
    }

    // Если юзер нажал на кнопку обновления предпочтений, то обновляем предпочтения
    if (req.body.updatePreferences) {
        con.query(`UPDATE add_info SET preferences=JSON_OBJECT('sport', '${req.body.sport}', 'level', '${req.body.level}') WHERE token='${req.cookies.access_token}'`, (err, result1) => {
            if (err) throw err;
        });
    }

    // Отвечаем на запрос, цель которого узнать есть ли информация о предпочтениях человека в базе данных
    if (req.body.getPreferences) {
        // Делаем запрос в базу данных (user должен пройти аутентификацию)
        con.query(`SELECT sport, game_level FROM add_info WHERE token='${req.cookies.access_token}'`, (err, result) => {
            if (err) throw err;

            // Если у юзера нет предпочтений, отправляем ошибку
            if (result[0].sport === '' || result[0].sport === undefined) return res.json({ error: true });

            // Если у юзера есть предпочтения, то сразу находим совпадения
            // Уровень игры - любой, спорт - НЕ любой

            else if (result[0].game_level === 'Любой' && result[0].sport !== 'Любой') {
                con.query(`SELECT age, user_name, acc_image, sport, game_level FROM add_info WHERE token<>'${req.cookies.access_token}' AND sport='${result[0].sport}' LIMIT 5`, (err, result1) => {
                    if (err) throw err
                    return res.json({ sport: result[0].sport, level: result[0].game_level, matches: result1 });
                });
                return
            }
            // Уровень игры - НЕ любой, спорт - любой
            else if (result[0].game_level !== 'Любой' && result[0].sport === 'Любой') {
                con.query(`SELECT age, user_name, acc_image, sport, game_level FROM add_info WHERE token<>'${req.cookies.access_token}' AND game_level='${result[0].game_level}' LIMIT 5`, (err, result1) => {
                    if (err) throw err
                    return res.json({ sport: result[0].sport, level: result[0].game_level, matches: result1 });
                });
                return
            }
            // Уровень игры - любой, спорт - любой
            else if (result[0].game_level === 'Любой' && result[0].sport === 'Любой') {
                con.query(`SELECT age, user_name, acc_image, sport, game_level FROM add_info WHERE token<>'${req.cookies.access_token}' LIMIT 5`, (err, result1) => {
                    if (err) throw err
                    return res.json({ sport: result[0].sport, level: result[0].game_level, matches: result1 });
                });
                return
            }
            // Уровень игры - НЕ любой, спорт - НЕ любой
            else if (result[0].game_level !== 'Любой' && result[0].sport !== 'Любой') {
                con.query(`SELECT age, user_name, acc_image, sport, game_level FROM add_info WHERE token<>'${req.cookies.access_token}' AND sport='${result[0].sport}' AND game_level='${result[0].game_level}' LIMIT 5`, (err, result1) => {
                    if (err) throw err
                    return res.json({ sport: result[0].sport, level: result[0].game_level, matches: result1 });
                });
                return
            }
        })
        return
    }

    // Эта часть должна быть последней
    // Если мы перешли по ссылке в которой уже указан вид спорта в GET запросе
    if (req.query.type) {
        con.query(`SELECT age, user_name, acc_image, game_level FROM add_info WHERE token<>'${req.cookies.access_token}' AND sport='${req.query.type}'`, (err, result) => {
            if (err) throw err
            return res.json({ sportType: req.query.type, matches: result});
        })
    }
    // Если мы просто зашли на страницу (НЕ по ссылке с указанным видом спорта в GET запросе)
    else {
        return res.json({ sportType: false });
    }

})

module.exports = router;
