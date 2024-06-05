const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class Product {
    constructor(body) {
        this.body = body
        this.idParam = ""
        this.errors = []
        this.product = null
    }

    async register() {
        this.validate()

        if (this.errors.length > 0) return

        const productExists = await prisma.products.findUnique({
            where: { name: this.body.name }
        })

        if (productExists) {
           this.errors.push('Produto já existe!')
        } else {
            this.product = await prisma.products.create({
                data: this.body
            })
        }
    }

    async validate() {
        this.cleanUp()

        if (!this.body.name) this.errors.push('Nome é um campo obrigatório')
        if (typeof this.body.price !== 'number' || this.body.price < 0) {
            this.errors.push('Preço não pode ser um valor negativo')
        }
        if (this.body.amount !== undefined && (!Number.isInteger(this.body.amount) || this.body.amount < 0)) {
            this.errors.push('Quantidade precisa ser um inteiro e um número positivo')
        }
    }

    async edit() {
        this.validate()

        if (this.errors.length > 0) return

        this.product = await prisma.products.update({
            where: { id: this.idParam },
            data: this.body
        })
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            name: this.body.productName.trim(),
            description: this.body.productDescription.trim(),
            price: Number(this.body.productPrice),
            amount: Number(this.body.productAmount),
        }
    }

    static async searchByID(id) {
        if (typeof id !== 'string') return
        const product = await prisma.products.findUnique({
            where: { id }
        })
        return product
    }

    static async delete(id) {
        if (typeof id !== 'string') return
        await prisma.products.delete({
            where: { id }
        })
    }
}

module.exports = Product