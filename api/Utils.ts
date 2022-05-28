import { UserModel } from "./models/user";
import { Request, Response, NextFunction } from "express";

declare global {
	namespace Express {
		interface Request {}
	}
}

const setHeaders = (req: Request, res: Response, next: NextFunction) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
};

// const getUser = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// 	part: any
// ) => {
// 	UserModel.find({ username: req[part].username })
// 		.then((results: any) => {
// 			res.user = results[0];
// 			next();
// 		})
// 		.catch((err: any) => res.status(500).send({ error: err.message }));
// };

// const getUserByParams = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => getUser(req, res, next, "params");

// const getUserByBody = async (req: Request, res: Response, next: NextFunction) =>
// 	getUser(req, res, next, "body");

// export { setHeaders, getUserByParams, getUserByBody };
export { setHeaders };
