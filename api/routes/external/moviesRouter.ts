import { Observable } from "rxjs";
import { Router, Request, Response } from "express";
import { setHeaders } from "../../Utils";
import {
	searchMovies,
	getMovieGroup,
	getRecommended,
	getSimilar,
} from "./movies";
import { Movie } from "./types/Movie";

const router: Router = Router();
router.use(setHeaders);

const sendMovies = (obs: Observable<Movie[]>, res: Response) =>
	obs.subscribe(
		(movies) => res.send(movies),
		(err) => res.send([])
	);

router.get("/search=:search", (req: Request, res: Response) =>
	sendMovies(searchMovies(req.params.search), res)
);

router.get("/group=:group", (req: Request, res: Response) =>
	sendMovies(getMovieGroup(req.params.group), res)
);

router.get("/recommended=:tmdb_id", (req: Request, res: Response) =>
	sendMovies(getRecommended(+req.params.tmdb_id), res)
);

router.get("/similar=:tmdb_id", (req: Request, res: Response) =>
	sendMovies(getSimilar(+req.params.tmdb_id), res)
);

module.exports = router;
