const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const { checkLogin } = require('../middlewares/middlewares')

router.get('/produto/index', checkLogin, productController.index)
router.post('/produto/registrar', checkLogin, productController.register)
router.get('/produto/editar/:id', checkLogin, productController.editIndex)
router.post('/produto/editar/:id', checkLogin, productController.edit)
router.get('/produto/excluir/:id', checkLogin, productController.delete)

module.exports = router