function checkToken(req, res, next) {
    if (req.cookies.access_token !== undefined) {
        return res.status(404).send('404 error')
    }

    next()
}

module.exports = {
    checkToken
}