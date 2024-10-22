"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const { databaseConfiguration } = require("../configurations");
const db = { sequelize: new Sequelize(databaseConfiguration[process.env.ENVIRONMENT || "development"]) };

// prettier-ignore
fs.readdirSync(__dirname).filter(function (fileName) {
	return fileName.indexOf(".") !== 0 && fileName !== path.basename(__filename) && fileName.slice(-3) === ".js" && fileName.indexOf(".test.js") === -1;
}).forEach(function (fileName) {
	const modelPath = path.resolve(__dirname, fileName);
	const model = require(modelPath)(db.sequelize);
	db[model.name] = model;

	if (db[model.name].associate) {
		db[model.name].associate(db);
	}
});

module.exports = db;
