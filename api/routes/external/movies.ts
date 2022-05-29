import { TMDBMovie } from "./types/TMDBMovie";
import { YTSMovie } from "./types/YTSMovie";
import * as YTS from "./yts";
import * as TMDB from "./tmdb";
import { TMDBorYTS } from "./types/Other";
import { Movie } from "./types/Movie";
import { Observable } from "rxjs";
import { map, filter, mergeMap, toArray } from "rxjs/operators";
import { HttpClient, HttpXhrBackend } from "@angular/common/http";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

type firstFunc = () => Observable<TMDBorYTS>;
type secondFunc = (movie: TMDBorYTS) => Observable<TMDBorYTS>;

//setup
const http = new HttpClient(
	new HttpXhrBackend({
		build: () => new XMLHttpRequest(),
	})
);

const searchMovies = (query: string) =>
	get(
		() => YTS.search(query),
		(movie) => TMDB.getMovieByIMDBId((<YTSMovie>movie).imdb_code)
	);

//Different movie group requests

const getMovieGroup = (group: string) =>
	YTSIMDB(() => TMDB.getMovieGroup(group));

const getRecommended = (tmdb_id: number) =>
	YTSIMDB(() => TMDB.getRecommended(tmdb_id));

const getSimilar = (tmdb_id: number) => YTSIMDB(() => TMDB.getSimilar(tmdb_id));

//helper function where second function is to get movies from YTS by ID
const YTSIMDB = (f: firstFunc) =>
	get(f, (movie) => YTS.getMovieByIMDBId((<TMDBMovie>movie).imdb_id));

//query first api for movie/movies then get same movie from other api, return as array

const get = (f1: firstFunc, f2: secondFunc): Observable<Movie[]> =>
	f1().pipe(
		mergeMap((movie1) =>
			f2(movie1).pipe(map((movie2) => mergeTypes(movie1, movie2)))
		),
		toArray()
	);

//merge TMDB movie and YTS movie into Movie type
const mergeTypes = (tmdb: TMDBorYTS, yts: TMDBorYTS): Movie => {
	[tmdb, yts] = (<TMDBMovie>tmdb).imdb_id
		? [<TMDBMovie>tmdb, <YTSMovie>yts]
		: [<TMDBMovie>yts, <YTSMovie>tmdb];

	return {
		yts_id: yts.id,
		tmdb_id: tmdb.id,
		summary: tmdb.overview,
		yt_trailer: yts.yt_trailer_code,
		poster: tmdb.poster_path,
		backdrop: tmdb.backdrop_path,
		...tmdb,
		...yts,
		imdb_id: yts.imdb_code,
		title: yts.title_english,
	};
};

export { http, searchMovies, getMovieGroup, getRecommended, getSimilar };
