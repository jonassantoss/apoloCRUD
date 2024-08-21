const { PrismaClient } = require("@prisma/client");
const { v7: uuidV7 } = require("uuid");

const prisma = new PrismaClient();

class Product {
	constructor(body) {
		this.body = body;
		this.idParam = "";
		this.errors = [];
		this.product = null;
	}

	async register() {
		this.validate();

		if (this.errors.length > 0) return;

		const productExists = await prisma.product.findUnique({
			where: { name: this.body.name },
		});

		if (productExists) {
			this.errors.push("Produto já existe!");
		} else {
			try {
				this.product = await prisma.product.create({
					data: {
						id: uuidV7(),
						...this.body,
					},
				});
			} catch (error) {
				this.errors.push("Erro ao registrar o produto");
				console.log(error);
			}
		}
	}

	async validate() {
		this.cleanUp();

		if (!this.body.name) this.errors.push("Nome é um campo obrigatório");
		if (typeof this.body.price !== "number" || this.body.price < 0) {
			this.errors.push("Preço não pode ser um valor negativo");
		}
		if (
			this.body.amount !== undefined &&
			(!Number.isInteger(this.body.amount) || this.body.amount < 0)
		) {
			this.errors.push(
				"Quantidade precisa ser um inteiro e um número positivo",
			);
		}
	}

	async edit() {
		this.validate();

		if (this.errors.length > 0) return;

		try {
			this.product = await prisma.product.update({
				where: { id: this.idParam },
				data: this.body,
			});
		} catch (error) {
			this.errors.push("Erro ao editar o produto");
			console.log(error);
		}
	}

	cleanUp() {
		for (const key in this.body) {
			if (typeof this.body[key] !== "string") {
				this.body[key] = "";
			}
		}

		this.body = {
			name: this.body.productName.trim(),
			description: this.body.productDescription.trim(),
			price: Number(this.body.productPrice),
			amount: Number(this.body.productAmount),
		};
	}

	static async searchProducts({ where = {}, skip, take, orderBy } = {}) {
		try {
			const queryOptions = {};

			if (Object.keys(where).length) queryOptions.where = where;
			if (skip !== undefined) queryOptions.skip = skip;
			if (take !== undefined) queryOptions.take = take;
			if (orderBy !== undefined) queryOptions.orderBy = orderBy;

			const [products, count] = await Promise.all([
				prisma.product.findMany(queryOptions),
				prisma.product.count({ where }),
			]);

			return { products, count };
		} catch (error) {
			console.error("Erro ao buscar produtos: ", error);
			throw new Error(
				"Não foi possivel buscar os produtos. Tente novamente mais tarde.",
			);
		}
	}

	static async searchByID(id) {
		if (typeof id !== "string") return;

		try {
			const product = await prisma.product.findUnique({
				where: { id },
			});
			return product;
		} catch (error) {
			console.log("Erro ao buscar o produto por ID:", error);
			return null;
		}
	}

	static async delete(id) {
		if (typeof id !== "string") return;

		try {
			await prisma.product.delete({
				where: { id },
			});
		} catch (error) {
			console.log("Erro ao excluir o produto:", error);
		}
	}
}

module.exports = Product;
