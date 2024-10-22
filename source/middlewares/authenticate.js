const { logHelper } = require("../helpers");

module.exports = async function (request, response, next) {
	try {
		console.log(request, response);
		await next();
	} catch (error) {
		response.status(301).send({ success: false, message: "Authenticate failed" });
		logHelper.error(error.name, error.message, "at authenticate in source/middlewares/authenticate.js");
	}
};
