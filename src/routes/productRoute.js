const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { checkLogin } = require("../middlewares/middlewares");

router.get("/produtos/novo", checkLogin, productController.index);
router.post("/produtos/novo", checkLogin, productController.register);
router.get("/produtos/editar/:id", checkLogin, productController.editIndex);
router.post("/produtos/editar/:id", checkLogin, productController.edit);
router.get("/produtos/deletar/:id", checkLogin, productController.delete);
router.get("/produtos/exportar", checkLogin, productController.exportTable);

module.exports = router;
