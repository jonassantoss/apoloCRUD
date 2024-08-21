const dataForge = require("data-forge");
require("data-forge-fs");

const formatDate = require("./../utils/formatDate.js");

module.exports = async (data, filePath) => {
	const formattedData = data.map((row) => {
		return {
			...row,
			createdAt: formatDate(row.createdAt),
			updatedAt: formatDate(row.updatedAt),
		};
	});

	const df = new dataForge.DataFrame(formattedData);
	await df.asCSV().writeFile(filePath);
};
