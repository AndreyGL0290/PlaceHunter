const { inDB } = require('../middlewares/inDB');
const { users } = require('../mongoDB/config')
const { requiresAuth } = require('express-openid-connect');
var router = require('express').Router();

router.get('/', requiresAuth(), function (req, res, next) {
    res.render('search')
});

router.post('/', inDB, requiresAuth(), async function (req, res, next) {
    if (!req.oidc.isAuthenticated()) {
        res.status(403).json('Authorize first')
    }

    let data2update = (await users.findOne({ userId: req.oidc.user.sub })).queries
    console.log(data2update)

    if (data2update) {
        if (data2update[req.body.place]) data2update[req.body.place] += 1
        else data2update[req.body.place] = 1 
    } else {
        data2update = {}
        data2update[req.body.place] = 1
    }

    console.log(data2update)
    users.updateOne({ userId: req.oidc.user.sub }, {$set: {queries: data2update}})

    res.status(200).json('OK')
})

module.exports = router;