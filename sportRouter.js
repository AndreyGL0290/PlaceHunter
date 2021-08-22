const express = require('express');
const router = express.Router();
const sports = ['Баскетбол', 'Футбол', 'Скейтбординг', 'BMX'];

router.use(express.static('public'));
router.use('/css', express.static(__dirname + 'public/css'));
router.use('/img', express.static(__dirname + 'public/img'));
router.use('/js', express.static(__dirname + 'public/js'));

router.use(function sportType(req, res, next) {
    next();
});

router.get('/', function (req, res) {
    res.render('sport');
});

router.get('/:sport', function (req, res) {
    if (req.params.sport == sports[sports.indexOf(req.params.sport)]) res.render('anysportpage', { sportType: req.params.sport });
});


module.exports = router;
