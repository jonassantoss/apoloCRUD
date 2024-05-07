exports.checkLogin = (req, res, next) => {
    console.log(req.session)
    
    if (req.session.login !== undefined) {
        next()
    } else {
        res.redirect('/login')
    }
}