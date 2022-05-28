import { Review } from "./types/Review";
import { http } from "./movies";
import { TMDB_BASE_URL, API_KEY } from "./types/Other";
import {
	TMDBMovie,
	Response,
	External,
	ReviewObj,
	Provider,
	ProviderObj,
} from "./types/TMDBMovie";
import { concat, EMPTY, from, Observable, forkJoin } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";

const KEY: string = `api_key=${API_KEY}`;
const LANG: string = "&language=en-US";

//determine TMDB return type and reduce to movies in an array
const type = (res: any): TMDBMovie[] => {
	if ((<Response>res).results) return (<Response>res).results;
	if ((<TMDBMovie>res).id) return [<TMDBMovie>res];
	if ((<External>res).movie_results) return (<External>res).movie_results;
	return [];
};

//makes request to TMDB API and map to movies Array using type()
const httpGet = (
	apiString: string,
	imdb: string = ""
): Observable<TMDBMovie[]> =>
	http
		.get(TMDB_BASE_URL + apiString + KEY + LANG + imdb)
		.pipe(map((res) => type(res)));

const httpGetReviews = (apiString: string): Observable<Review[]> =>
	http
		.get<ReviewObj>(TMDB_BASE_URL + apiString + KEY)
		.pipe(map(({ results }) => results));

const httpGetProviders = (apiString: string): Observable<Provider[]> =>
	http
		.get<ProviderObj>(TMDB_BASE_URL + apiString + KEY)
		.pipe(
			map(({ results }) => (results.US?.flatrate ? results.US?.flatrate : []))
		);

//get movie array by Group type
const getMovieGroup = (query: string) =>
	getFull(query === "trending" ? `trending/all/week?` : `movie/${query}?`);

//get recommended for specific movie
const getRecommended = (id: number) => getFull(`movie/${id}/recommendations?`);

//get recommended for specific movie
const getSimilar = (id: number) => getFull(`movie/${id}/similar?`);

//get movie group (filled with incomplete movies) then requery api by ids for full movies one by one
const getFull = (queryGroup: string): Observable<TMDBMovie> =>
	httpGet(queryGroup).pipe(
		concatMap((arr) => from(arr)),
		mergeMap(({ id }) => getById(id).pipe(catchError(() => EMPTY)))
	);

const getById = (id: number) => {
	return forkJoin(
		httpGet(`movie/${id}?`),
		httpGetReviews(`movie/${id}/reviews?`),
		httpGetProviders(`movie/${id}/watch/providers?`)
	).pipe(
		map(([movie, reviews, providers]) => {
			return {
				...movie[0],
				reviews: reviews,
				providers: providers,
			};
		})
	);
};

const getMovieByIMDBId = (id: string) =>
	httpGet(`find/${id}?`, "&external_source=imdb_id").pipe(
		mergeMap(([{ id }]) => getById(id))
	);

const getMoviesByIMDBIds = (ids: string[]) =>
	concat(...ids.map((id) => getMovieByIMDBId(id)));

export {
	httpGetReviews,
	httpGetProviders,
	getMovieGroup,
	getRecommended,
	getSimilar,
	getFull,
	getMovieByIMDBId,
	getMoviesByIMDBIds,
};
