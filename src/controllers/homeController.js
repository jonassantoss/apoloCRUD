const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
require("dayjs/locale/pt-br");
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

const Product = require("../models/Product");

exports.index = async (req, res) => {
	let { page = 1, search = "", rows } = req.query;
	rows = Number.parseInt(rows) || 10;

	const skip = (page - 1) * rows;
	const query = search ? { name: { contains: search } } : {};

	try {
		const { products, count } = await Product.searchProducts({
			where: query,
			skip: skip,
			take: rows,
		});

		const productsFormatted = products.map((product) => {
			product.createdAt = dayjs().to(product.createdAt.toLocaleString());
			product.updatedAt = dayjs().to(product.updatedAt.toLocaleString());
			return product;
		});

		res.location(`/?page=${page}&rows=${rows}&search=${search}`);

		res.render("index", {
			product: {},
			products: productsFormatted,
			currentPage: Number.parseInt(page),
			totalPages: Math.ceil(count / rows),
			search,
			rows,
			count,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};
