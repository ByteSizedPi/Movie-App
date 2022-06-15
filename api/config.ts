import { config as dotEnvConfig } from "dotenv";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

declare global {
	namespace Express {
		interface Request {}
	}
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			API_KEY: string;
		}
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

const config = () => {
	dotEnvConfig();

	mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = mongoose.connection;
	db.on("error", (err: Error) => console.log("database not running"));
	db.once("open", () => console.log("connected to database"));
};

export { config, setHeaders };
