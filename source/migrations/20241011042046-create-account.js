"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const dateSample = new Date(0);

		await queryInterface.createTable("Account", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				defaultValue: 0
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				defaultValue: "test"
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "test"
			},
			full_name: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "test"
			},
			role: {
				type: Sequelize.ENUM,
				allowNull: false,
				values: ["user", "admin"],
				defaultValue: "user"
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: dateSample
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: dateSample
			}
		});
	},
	async down(queryInterface, Sequelize) {
		console.log(Sequelize);
		await queryInterface.dropTable("Account");
	}
};
