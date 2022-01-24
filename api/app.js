require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { setHeaders } = require("./Utilities");
const app = express();

app.use(express.json());
app.use(setHeaders);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

const moviesRouter = require("./routes/movies");
app.use("/api/movies", moviesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on localhost:${port}`));