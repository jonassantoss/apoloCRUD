const bcrypt = require("bcryptjs");
const { v7: uuidV7} = require("uuid");
const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateAdmin() {
  const adminEmail = "admin@gmail.com";
  const adminPassword = "senha@123";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }
}

async function generateProducts(numProducts) {
  const products = [];
  for (let i = 0; i < numProducts; i++) {
    const product = {
      id: uuidV7(),
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: Number(faker.commerce.price({ min: 10, max: 200 })),
      amount: getRandomInt(5, 50),
    };
    products.push(product);
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }
}

async function main() {
  await generateAdmin();
  await generateProducts(100);
}

main()
  .then(async () => {
    console.log("Database seeded!");
    await prisma.$disconnect();
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
