function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/login')
}

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/school')
    }
    next()
}

module.exports = {
    checkNotAuth,
    checkAuth
};