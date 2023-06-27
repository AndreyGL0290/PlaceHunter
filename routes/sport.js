var router = require('express').Router();

let testCoords = {
    latitude: '30.096402858352075',
    longitude: '-81.53905389974591'
}

router.get('/', function (req, res, next) {
    res.render('sport')
});

module.exports = router;