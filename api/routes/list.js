const router = require("express").Router();
const User = require("../models/user");
const { getUserByParams } = require("../Utilities");

/* get methods */

//get entire user list
router.get("/username=:username", [getUserByParams, userExists], (req, res) =>
  res.send(res.user.shows_list)
);

/* post methods */

//add new show to list
router.post("/username=:username", [getUserByParams, userExists], (req, res) => {
  // res.user.shows_list.push(req.body.show);

  // res.send(req.body.show);

  User.updateOne({
    username: req.params.username,
    "shows_list": [...res.user.shows_list, req.body.show]
  })
    .then(_ => res.status(201).send({ message: "list updated successfully" }))
    .catch(err => res.status(500).send({ error: err.message }));
});

/* delete methods */

//remove show from list
// router.delete("/username=:username&imdbid=:imdbid", [getUserByParams, userExists], (req, res) => {
//   res.user.list_imdb_ids = res.user.list_imdb_ids.filter(imdbid => req.params.imdbid != imdbid);

//   User.updateOne({
//     username: req.params.username,
//     "list_imdb_ids": res.user.list_imdb_ids
//   })
//     .then(_ => res.status(201).send({ message: "list updated successfully" }))
//     .catch(err => res.status(500).send({ error: err.message }))
// });

function userExists(req, { user }, next) {
  if (!user) return res.status(404).send({ error: "user does not exist" });
  next();
}

module.exports = router;
