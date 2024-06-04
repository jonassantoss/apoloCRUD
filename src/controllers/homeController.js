const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/pt-br')
dayjs.extend(relativeTime);
dayjs.locale('pt-br')

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

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

        res.render('index', {
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