const router = require("express").Router();
const User = require("../models/user");
const { getUserByBody, getUserByParams } = require("../Utilities");

const listRouter = require("./list");
router.use("/list", listRouter);

/* get methods */

//get all users
router.get("/all", (req, res) => {
  User.find({})
    .then(allUsers => res.send(allUsers))
    .catch(err => res.status(500).send({ error: err.message }));
});

//test if username exists
router.get("/username=:username", getUserByParams, (req, res) =>
  res.send({ username: req.params.username, userExists: !!res.user })
);

/* post methods */

//create new user
router.post("/new", [getUserByBody, isValidNewUser], async (req, res) => {
  (new User(req.body)).save()
    .then(_ => res.status(201).send({ message: "user created successfully" }))
    .catch(err => res.status(400).send({ error: err.message }));
});

// router.post("/", getUserByBody, (req, res) => {
//   try {
//     if (res.user && res.user.password === req.body.password)
//       res.send({ token: "#1542" });
//     else res.send({ error: "user does not exist" });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

function isValidNewUser(req, res, next) {
  if (res.user) return res.send({ error: "user already exists" });
  if (!req.body.username || req.body.username.length < 6)
    return res.send({ error: "username must be longer than 6 characters" });
  if (!req.body.password || req.body.password.length < 6)
    return res.send({ error: "password must be longer than 6 characters" });
  next();
}

// router.patch("/:id", (req, res) => { });

// router.delete("/:id", (req, res) => { });

module.exports = router;
