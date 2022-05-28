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

const getUser = async (req, res, next, part) => {
	User.find({ username: req[part].username })
		.then((results) => {
			res.user = results[0];
			next();
		})
		.catch((err) => res.status(500).send({ error: err.message }));
};

const getUserByParams = async (req, res, next) =>
	getUser(req, res, next, "params");
const getUserByBody = async (req, res, next) => getUser(req, res, next, "body");

module.exports = { setHeaders, getUserByParams, getUserByBody };
