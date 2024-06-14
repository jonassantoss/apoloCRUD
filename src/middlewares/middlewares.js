exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.login = req.session.login;
  next();
};

exports.checkCSRFERROR = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.checkLogin = (req, res, next) => {
  if (req.session.login !== undefined) {
    next();
  } else {
    req.flash("errors", "É necessário fazer login para realizar essa ação.");
    res.redirect("/login");
  }
};
