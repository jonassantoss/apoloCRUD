const express = require('express')
const { checkLogin } = require('./middlewares/checkLogin')

const routes = express.Router()

// Rotas da Home
routes.get('/', checkLogin, (req, res) => {
    res.render('index')
})

// Rotas do Login
routes.get('/login', (req, res) => {
    res.render('login')
})
routes.post('/login', (req, res) => {
    const user = req.body.user
    const password = req.body.user

    if (user !== undefined && user === 'apolo@gmail.com') {
        const validPswd = password === 'senha@123'

        if (validPswd) {
            req.body.login = {
                user
            }

            res.redirect('/')
        } else {
            res.render('login', { msg: 'Usuário ou senha inválidos!' })
        }
    } else {
        res.render('login', { msg: 'Usuário ou senha inválidos!' })
    }
})

module.exports = routes