import { config, setHeaders } from "./config";
import Express from "express";

config();

const app: Express.Application = Express();
app.use([Express.json(), setHeaders]);

import { router as moviesRouter } from "./routes/external/moviesRouter";
app.use("/api/movies", moviesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on localhost:${port}`));
