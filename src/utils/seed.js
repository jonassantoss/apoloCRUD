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
            name: 'Camiseta Branca Básica',
            description: 'Camiseta de algodão 100% confortável',
            price: 29.99,
            amount: 100
        },
        {
            name: 'Jeans Skinny',
            description: 'Calça jeans estilo skinny',
            price: 89.99,
            amount: 50
        },
        {
            name: "Calça Jeans Slim",
            description: "Calça jeans slim fit, perfeita para looks casuais.",
            price: 49.99,
            amount: 80,
        },
        {
            name: "Blusa de Moletom",
            description: "Blusa de moletom com capuz, quente e estilosa.",
            price: 59.99,
            amount: 70,
        },
        {
            name: "Vestido Floral",
            description: "Vestido floral, leve e feminino.",
            price: 79.99,
            amount: 60,
        },
        {
            name: "Jaqueta de Couro",
            description: "Jaqueta de couro legítimo, resistente e estilosa.",
            price: 129.99,
            amount: 30,
        },
        {
            name: "Camisa Social",
            description: "Camisa social de algodão, ideal para ocasiões formais.",
            price: 69.99,
            amount: 40,
        },
        {
            name: "Shorts Jeans",
            description: "Shorts jeans despojado, perfeito para o verão.",
            price: 34.99,
            amount: 90,
        },
        {
            name: "Saia Midi",
            description: "Saia midi plissada, elegante e versátil.",
            price: 54.99,
            amount: 55,
        },
        {
            name: "Blazer Slim Fit",
            description: "Blazer slim fit, moderno e sofisticado.",
            price: 89.99,
            amount: 35,
        },
        {
            name: "Regata Esportiva",
            description: "Regata esportiva, confortável e respirável.",
            price: 19.99,
            amount: 120,
        },
        {
            name: "Casaco de Inverno",
            description: "Casaco de inverno acolchoado, quente e estiloso.",
            price: 149.99,
            amount: 25,
        },
        {
            name: "Pijama de Algodão",
            description: "Conjunto de pijama de algodão, confortável para dormir.",
            price: 39.99,
            amount: 65,
        },
        {
            name: "Maiô Estampado",
            description: "Maiô estampado, ideal para a praia ou piscina.",
            price: 69.99,
            amount: 45,
        },
        {
            name: "Terno Completo",
            description: "Terno completo (paletó + calça), para ocasiões formais.",
            price: 199.99,
            amount: 20,
        }
    ]

    for (const product of products) {
        await prisma.products.upsert({
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