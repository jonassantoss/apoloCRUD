const validator = require('validator')
const { PrismaClient } = require('@prisma/client')

exports.render = (req, res) => {
    res.render('login')
}

exports.login = async (req, res, next) => {
    const prisma = new PrismaClient()

    try {
        const { email, password } = req.body
        const adminExists = await prisma.users.findUnique({
            where: { email: email }
        })

        if (!adminExists) {

        }
    } catch (error) {
        
    }

    // try {
    //     const { user, password } = req.body

    //     if (user === process.env.ADMIN_USER) {
    //         const isValidPassword = password === process.env.ADMIN_PASSWORD

    //         if (isValidPassword) {
    //             req.session.login = { email: user }
    //             res.redirect('/')
    //         } else {
    //             throw new Error('Usuário ou senha inválidos')
    //         }
    //     } else {
    //         throw new Error('Usuário ou senha inválidos')
    //     }
    // } catch (error) {
    //     console.error('Erro no login:', error.message)
    //     res.render('login', { msg: 'Usuário ou senha inválidos!' })
    // }
}