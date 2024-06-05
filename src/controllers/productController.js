const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/pt-br')
dayjs.extend(relativeTime);
dayjs.locale('pt-br')

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const Produto = require("../models/productModel");

exports.index = async (req, res) => {
  const { page = 1, search = '' } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = search ? { name: { contains: search } } : {}

  try {
      const products = await prisma.products.findMany({
          where: query,
          skip: skip,
          take: limit,
          orderBy: { createdAt: 'desc' }
      })
      const count = await prisma.products.count({ where: query })

      const productsFormatted = products.map(product => {
          product.createdAt = dayjs().to(product.createdAt.toLocaleString())
          product.updatedAt = dayjs().to(product.updatedAt.toLocaleString())
          return product
      })

    res.render("produto", {
      product: {},
      products: productsFormatted,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      search
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

exports.indexNovo = (req, res) => {
  res.render("novoProduto", {
    product: {},
  });
};

exports.register = async (req, res) => {
  try {
    const product = new Produto(req.body);
    await product.register();

    if (product.errors.length > 0) {
      req.flash("errors", product.errors);
      req.session.save(() => res.redirect(`/produto/novo`));
      return;
    }

    req.flash("success", "Produto registrado com sucesso");
    req.session.save(() =>
      res.redirect(`/produto`)
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
    const product = new Produto(req.body)
    product.idParam = req.params.id
    await product.edit()

    if (product.errors.length > 0) {
      req.flash('errors', product.errors)
      req.session.save(() => (res.redirect(`/produto/editar/${product.idParam}`)))
      return
    } else {
      req.flash("success", "Produto editado com sucesso!")
      req.session.save(() => res.redirect('/produto'))
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
    req.session.save(() => res.redirect('/produto'))
  } catch (error) {
    console.log(error)
    res.rend('404')
  }
}