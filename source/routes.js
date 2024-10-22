const models = require("./models");
const { logHelper } = require("./helpers");
const { Sequelize } = models;
const branchNames = ["accounts", "categories", "collections", "products"];
const modelNames = ["Account", "Category", "Collection", "Product"];
const itemNames = ["Create", "Read", "Update", "Delete"];
const itemMethods = ["POST", "GET", "PATCH", "DELETE"];
const itemHandlers = [
	async function (model, data, _conditions) {
		return await model.bulkCreate(data);
	},
	async function (model, _data, conditions) {
		return await model.findAll({ where: conditions });
	},
	async function (model, data, conditions) {
		return await model.update(data, { where: conditions });
	},
	async function (model, _data, conditions) {
		return await model.destroy({ where: conditions });
	}
];

function setupBranch(name, model) {
	return itemNames.map(function (itemName, index) {
		return {
			path: `/${name}`,
			method: itemMethods[index],
			handler: async function (request, response, next) {
				try {
					const { data, conditions } = request.body;

					for (const key in conditions) {
						switch (conditions[key].constructor) {
							case Array: {
								conditions[key] = { [Sequelize.Op.in]: conditions[key] };
								break;
							}
						}
					}

					const items = await itemHandlers[index](model, data, conditions);

					response.status(200).send({ success: true, message: `${itemName} successfully`, data: items });
					await next();
				} catch (error) {
					response.status(301).send({ success: false, message: `${itemName} failed` });
					logHelper.error(error.name, error.message, `at ${itemName} route in source/routes.js`);
				}
			}
		};
	});
}

module.exports = branchNames.reduce(function (accumulator, branchName, index) {
	return accumulator.concat(setupBranch(branchName, models[modelNames[index]]));
}, []);
