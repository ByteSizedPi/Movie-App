import { config } from "dotenv";
import Express from "express";
import mongoose from "mongoose";
import { setHeaders } from "./Utils";

config();

const app: Express.Application = Express();
app.use(Express.json());
app.use(setHeaders);

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			API_KEY: string;
		}
	}
}

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err: Error) => console.log(err.message));
db.once("open", () => console.log("connected to database"));

// const usersRouter = require("./routes/users");
// app.use("/api/users", usersRouter);

const moviesRouter = require("./routes/external/moviesRouter");
app.use("/api/movies", moviesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on localhost:${port}`));
