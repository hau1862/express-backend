"use strict";

const { Model, DataTypes } = require("sequelize");
const dateSample = new Date(0);

class Account extends Model {
	static associate(models) {
		console.log(models);
	}
}

const attributes = {
	id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, autoIncrement: true, primaryKey: true },
	username: { type: DataTypes.STRING, allowNull: false, defaultValue: "", unique: true },
	password: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	fullName: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	role: { type: DataTypes.ENUM, allowNull: false, defaultValue: "user", values: ["user", "admin"] },
	createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: dateSample },
	updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: dateSample }
};

module.exports = function (sequelize) {
	Account.init(attributes, { sequelize, modelName: "Account", underscored: true });
	return Account;
};
