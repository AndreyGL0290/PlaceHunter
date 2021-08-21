const express = require('express');
const router = express.Router();
const sports = ['basketball', 'football', 'Skateboarding', 'BMX'];
router.use(function sportType(req, res, next) {
    next();
});

router.get('/', function (req, res) {
    res.render('sport');
});

router.get('/:sport', function (req, res) {
    if (req.params.sport == sports[sports.indexOf(req.params.sport)]) res.send(`This is ${req.params.sport} page`);
});


module.exports = router;
