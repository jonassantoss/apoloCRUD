const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/login', (req, res) => {
    res.render('login')
})

module.exports = {
    routes
}