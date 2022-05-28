import { UserModel } from "./../models/user";
import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { getUserByParams } from "../Utils";

declare global {
	namespace Express {
		interface Response {
			user: User;
		}
	}
}

const router: Router = Router();

//user exists middleware
function userExists(req: Request, res: Response, next: NextFunction) {
	if (!res.user) {
		res.status(404).send({ error: "user does not exist" });
		return;
	}
	next();
}

router.use(getUserByParams, userExists);

/* get methods */

//get entire user list
router.get("/username=:username", (req: Request, res: Response) =>
	res.send(res.user.shows_list)
);

/* post methods */

//add new show to list
router.post("/username=:username", (req: Request, res: Response) => {
	// res.user.shows_list.push(req.body.show);

	// res.send(req.body.show);

	UserModel.updateOne({
		username: req.params.username,
		shows_list: [...res.user.shows_list, req.body.show],
	})
		.then((_: any) =>
			res.status(201).send({ message: "list updated successfully" })
		)
		.catch((err: Error) => res.status(500).send({ error: err.message }));
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

export { router };
