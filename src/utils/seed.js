const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function generateAdmin() {
    const adminEmail = "admin@gmail.com"
    const adminPassword = "senha@123"

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const adminExists = await prisma.users.findUnique({
        where: { email: adminEmail }
    })

    if (!adminExists) {
        await prisma.users.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN'
            },
        });
    }
}

async function generateProducts() {
    const products = [
        {
            name: 'Camiseta Básica',
            description: 'Camiseta de algodão 100% confortável',
            price: 29.99,
            amount: 100
        },
        {
            name: 'Jeans Skinny',
            description: 'Calça jeans estilo skinny',
            price: 89.99,
            amount: 50
        }
    ]

    for (const product of products) {
        await prisma.produtos.upsert({
            where: { name: product.name },
            update: {},
            create: product
        })
    }
}

async function main() {
    await generateAdmin()
    await generateProducts()
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });