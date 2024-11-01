const express = require("express");
require("./custom.js");
const routes = require("./routes");
const app = express();

app.use(express.json());
routes.forEach(function (route) {
	app[route.method.toLowerCase()](route.path, route.handler);
});
