module.exports = {
	info: function (...contents) {
		console.log("\x1b[36m%s\x1b[0m", ...contents);
	},
	warn: function (...contents) {
		console.log("\x1b[33m%s\x1b[0m", ...contents);
	},
	error: function (...contents) {
		console.log("\x1b[31m%s\x1b[0m", ...contents);
	}
};
