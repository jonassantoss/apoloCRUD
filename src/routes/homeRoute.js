const express = require('express')
const router = express.Router()

const { checkLogin } = require('../middlewares/middlewares')
const homeController = require('../controllers/homeController')

router.get('/', checkLogin, homeController.index)

module.exports = router