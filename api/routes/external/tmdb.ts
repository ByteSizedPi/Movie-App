import { http } from "./movies";
import { TMDB_BASE_URL, API_KEY } from "./types/Other";
import {
	TMDBMovie,
	Response,
	External,
	ReviewObj,
	Provider,
	ProviderObj,
	Review,
} from "./types/TMDBMovie";
import { Observable, forkJoin } from "rxjs";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";

const KEY = `api_key=${API_KEY}`;
const LANG = "&language=en-US";

//determine TMDB return type and reduce to TMDBMovie array
const type = (res: any): TMDBMovie[] => {
	if ((<Response>res).results) return (<Response>res).results;
	if ((<TMDBMovie>res).id) return [<TMDBMovie>res];
	if ((<External>res).movie_results) return (<External>res).movie_results;
	return [];
};

//all movie requests go through httpGet to return conformed results
const httpGet = (
	apiString: string,
	imdb: string = ""
): Observable<TMDBMovie[]> => {
	const url = TMDB_BASE_URL + apiString + KEY + LANG + imdb;
	return http.get(url).pipe(
		map((res) => type(res)),
		catchError(() => [])
	);
};

//additional get requests for movie related queries
const httpGetReviews = (apiString: string): Observable<Review[]> =>
	http.get<ReviewObj>(TMDB_BASE_URL + apiString + KEY).pipe(
		map(({ results }) => results),
		catchError(() => [])
	);

const httpGetProviders = (apiString: string): Observable<Provider[]> =>
	http.get<ProviderObj>(TMDB_BASE_URL + apiString + KEY).pipe(
		map(({ results }) => (results.US?.flatrate ? results.US?.flatrate : [])),
		catchError(() => [])
	);

//get movie array by Group type
const getMovieGroup = (query: string) =>
	getFull(query === "trending" ? `trending/all/week?` : `movie/${query}?`);

//get recommended for specific movie
const getRecommended = (id: number) => getFull(`movie/${id}/recommendations?`);

//get recommended for specific movie
const getSimilar = (id: number) => getFull(`movie/${id}/similar?`);

//get Movie array (by group) then send each movie to getById
const getFull = (queryGroup: string): Observable<TMDBMovie> =>
	httpGet(queryGroup).pipe(
		switchMap((arr) => arr),
		mergeMap(({ id }) => getById(id))
	);

//get full movie, reviews and providers then combine into object
const getById = (id: number): Observable<TMDBMovie> => {
	return forkJoin([
		httpGet(`movie/${id}?`),
		httpGetReviews(`movie/${id}/reviews?`),
		httpGetProviders(`movie/${id}/watch/providers?`),
	]).pipe(
		filter((movie) => !!movie[0]),
		map(([movie, reviews, providers]) => {
			return {
				...movie[0],
				reviews: reviews,
				providers: providers,
			};
		})
	);
};

//when searched by imdb_id, since limited results are returned, pass to getById for full results
const getMovieByIMDBId = (id: string) =>
	httpGet(`find/${id}?`, "&external_source=imdb_id").pipe(
		switchMap(([{ id }]) => getById(id))
	);

// const getMoviesByIMDBIds = (ids: string[]) => {
// 	console.log(ids);
// 	return concat(...ids.map((id) => getMovieByIMDBId(id)));
// };

export {
	getMovieGroup,
	getRecommended,
	getSimilar,
	getFull,
	getMovieByIMDBId,
	// getMoviesByIMDBIds,
};
