"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		console.log(Sequelize);
		const dateSample = new Date(0);

		await queryInterface.bulkInsert("Account", [
			{ username: "user-test", password: "123456", full_name: "User Test", role: "user", created_at: dateSample, updated_at: dateSample },
			{ username: "admin-test", password: "123456", full_name: "Admin Test", role: "admin", created_at: dateSample, updated_at: dateSample }
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Account", { username: { [Sequelize.Op.in]: ["user-test", "admin-test"] } }, {});
	}
};
