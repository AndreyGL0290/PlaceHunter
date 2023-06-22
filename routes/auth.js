var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const { users } = require('../mongoDB/config')

router.get('/', async function (req, res, next) {
  if (req.oidc.isAuthenticated()){
    let user = await users.find({ userId: req.oidc.user.sub }, { userId: 1, _id: 0 }).toArray();
    if (user.length == 0) users.insertOne({ userId: req.oidc.user.sub });
  }

  res.render('home', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), async function (req, res, next) {
  let user = await users.find({ userId: req.oidc.user.sub }).toArray()
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    serverData: JSON.stringify(user[0], null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
