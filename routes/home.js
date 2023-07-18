var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const { users } = require('../mongoDB/config')

router.get('/', async function (req, res, next) {
  res.render('home');
});

router.get('/profile', requiresAuth(), async function (req, res, next) {
  let user = (await users.find({ userId: req.oidc.user.sub }).project({_id: 0, queries: 1}).toArray())[0]
  let keys;
  let largest;
  let result;
  let statistic;
  
  if (user) {
    keys = Object.keys(user.queries)
    largest = Math.max.apply(null, keys.map(x => user.queries[x]))
    result = keys.reduce((result, key) => { if (user.queries[key] === largest){ result.push(key); } return result; }, []);
    statistic = user ? 'Most searched by You: '+result[0] : 'No queries have been done yet'
  }

  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    serverData: statistic,
    title: 'Profile page'
  });
});

module.exports = router;
