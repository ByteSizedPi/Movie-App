"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeaders = void 0;
const tslib_1 = require("tslib");
const User = require("../api/models/user");
const setHeaders = (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
};
exports.setHeaders = setHeaders;
const getUser = (req, res, next, part) =>
	tslib_1.__awaiter(void 0, void 0, void 0, function* () {
		User.find({ username: req[part].username })
			.then((results) => {
				res.user = results[0];
				next();
			})
			.catch((err) => res.status(500).send({ error: err.message }));
	});
const getUserByParams = (req, res, next) =>
	tslib_1.__awaiter(void 0, void 0, void 0, function* () {
		return getUser(req, res, next, "params");
	});
const getUserByBody = (req, res, next) =>
	tslib_1.__awaiter(void 0, void 0, void 0, function* () {
		return getUser(req, res, next, "body");
	});
//# sourceMappingURL=Utils.js.map
