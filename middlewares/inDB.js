const { users } = require("../mongoDB/config");

async function inDB(req, res, next) {
    if (!req.cookies.inDB) {
        let user = await users.find({ userId: req.oidc.user.sub }, { userId: 1, _id: 0 }).toArray();
        if (user.length == 0) users.insertOne({ userId: req.oidc.user.sub });
        res.cookie('inDB', 'true', 900000)
    }
    next()
}

module.exports = {inDB}