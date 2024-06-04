const Produto = require("../models/productModel");

exports.index = (req, res) => {
  res.render("produto", {
    product: {},
  });
};

exports.register = async (req, res) => {
  try {
    const product = new Produto(req.body);
    await product.register();

    if (product.errors.length > 0) {
      req.flash("errors", product.errors);
      req.session.save(() => res.redirect(`/produto/editar/${product.idParam}`));
      return;
    }

    req.flash("success", "Produto registrado com sucesso");
    req.session.save(() =>
      res.redirect(`/`)
    );
    return;
  } catch (error) {
    console.log(error)
    res.render('404')
  }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404')

    const product = await Produto.searchByID(req.params.id)
    if (!product) return

    res.render('produto', { product })
}

exports.edit = async (req, res) => {
  try {
    const product = new Produto(req.body, req.params.id)
    await product.edit()

    if (product.errors.length > 0) {
      req.flash('errors', product.errors)
      req.session.save(() => (res.redirect(`/produto/editar/${product.idParam}`)))
      return
    } else {
      req.flash("success", "Produto editado com sucesso!")
      req.session.save(() => res.redirect('/'))
      return
    }
  } catch (error) {
    console.log(error)
    res.render('404')
  }
}

exports.delete = async (req, res) => {
  if (!req.params.id) res.render('404')

  try {
    await Produto.delete(req.params.id)
    req.flash('success', 'Produto excluido com sucesso!')
    req.session.save(() => res.redirect('/'))
  } catch (error) {
    console.log(error)
    res.rend('404')
  }
}