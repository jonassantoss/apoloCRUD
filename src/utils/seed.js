const bcrypt = require("bcryptjs");
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

  const adminExists = await prisma.users.findUnique({
    where: { email: adminEmail },
  });

  if (!adminExists) {
    await prisma.users.create({
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
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: Number(faker.commerce.price({ min: 10, max: 200 })),
      amount: getRandomInt(5, 50),
    };
    products.push(product);
  }

  for (const product of products) {
    await prisma.products.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }
}

async function main() {
  console.log("Gerando usuário do admin.");
  await generateAdmin();
  console.log("Gerando os produtos ficticíos...");
  await generateProducts(100);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
