const express = require('express')

const router = express.Router()
const loginController = require('../controllers/loginController')

router.get('/login', loginController.render)
router.post('/login', loginController.login)

module.exports = router