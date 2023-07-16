const { requiresAuth } = require('express-openid-connect');
var router = require('express').Router();

router.get('/', requiresAuth(), function (req, res, next) {
    res.render('search')
});

module.exports = router;