const path = require("path");
const fs = require("fs");

const Product = require("../models/Product.js");
const exportToExcel = require("../utils/exportToExcel.js");

exports.index = (req, res) => {
  res.render("product", {
    product: {},
  });
};

exports.register = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.register();

    if (product.errors.length > 0) {
      req.flash("errors", product.errors);
      req.session.save(() => res.redirect(`/produtos/novo`));
      return;
    }

    req.flash("success", "Produto registrado com sucesso");
    req.session.save(() => res.redirect(`/`));
    return;
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const product = await Product.searchByID(req.params.id);
  if (!product) return res.render("404");

  res.render("product", { product, search: "" });
};

exports.edit = async (req, res) => {
  try {
    const product = new Product(req.body);
    product.idParam = req.params.id;
    await product.edit();

    if (product.errors.length > 0) {
      req.flash("errors", product.errors);
      req.session.save(() => res.redirect(`/`));
      return;
    } else {
      req.flash("success", "Produto editado com sucesso!");
      req.session.save(() => res.redirect("/"));
      return;
    }
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) res.render("404");

  try {
    await Product.delete(req.params.id);
    req.flash("success", "Produto excluido com sucesso!");
    req.session.save(() => res.redirect("/"));
  } catch (error) {
    console.log(error);
    req.flash("errors", "Ocorreu um erro ao excluir o produto.");
    res.redirect("/");
  }
};

exports.exportTable = async (req, res) => {
  const downloadDir = path.resolve("public", "downloads");
  console.log(downloadDir);

  try {
    const { products } = await Product.searchProducts();
    const outputFile = "products.csv";
    const filePath = path.join(downloadDir, outputFile);

    await exportToExcel(products, filePath);

    res.attachment(outputFile);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Erro ao enviar o arquivo: ", err);
        return res.status(500).json({
          success: false,
          message: "Erro ao enviar o arquivo",
        });
      }

      setImmediate(() => {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr)
            console.error("Erro ao excluir o arquivo: ", unlinkErr);
        });
      });
    });
  } catch (error) {
    console.error("Erro ao exportar a tabela: ", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao exportar a tabela.",
    });
  }
};
