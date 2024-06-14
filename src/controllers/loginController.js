const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

exports.render = (req, res) => {
  res.render("login");
};

exports.login = async (req, res, next) => {
  const prisma = new PrismaClient();

  try {
    const { user, pswd } = req.body;
    const adminExists = await prisma.users.findUnique({
      where: { email: user },
    });

    if (!adminExists) {
      req.flash("errors", "Usuário não existe!");
      req.session.save(() => {
        return res.redirect("/login");
      });
    } else {
      const { email, password } = adminExists;
      const passwordIsValid = bcrypt.compareSync(pswd, password);

      if (passwordIsValid) {
        req.session.login = email;
        req.session.save(() => {
          return res.redirect("/");
        });
      } else {
        req.flash("errors", "Usuário ou senha inválidos!");
        req.session.save(() => {
          return res.redirect("/login");
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.redirect("404");
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};
