function middlewareGlobal (req, res, next) {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
}

module.exports = middlewareGlobal