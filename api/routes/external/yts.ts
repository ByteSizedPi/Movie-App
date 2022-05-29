import { YTSMovie } from "./types/YTSMovie";
import { http } from "./movies";
import { YTS_BASE_URL } from "./types/Other";
import { EMPTY, from, Observable } from "rxjs";
import {
	catchError,
	concatMap,
	filter,
	map,
	mergeMap,
	switchMap,
} from "rxjs/operators";

type Response = { data: { movies: YTSMovie[]; movie: YTSMovie } };

//makes request to YTS API and map to movies Array using type()
const httpGet = (apiString: string) => {
	const url = YTS_BASE_URL + apiString;
	return http.get<Response>(url).pipe(
		map((res) => type(res)),
		catchError(() => {
			console.log("error retrieving movies from:" + url);
			return [];
		})
	);
};

//Map API results into movie array
const type = ({ data: { movies, movie } }: Response): YTSMovie[] =>
	movies ?? [movie] ?? [];

const search = (queryGroup: string): Observable<YTSMovie> => {
	return httpGet(`list_movies.jsonp?query_term=${queryGroup}`).pipe(
		filter(([movie]) => !!movie),
		switchMap((arr) => arr),
		mergeMap(({ id }) => getById(id))
	);
};

const getMovieByIMDBId = (id: string): Observable<YTSMovie> =>
	httpGet(`list_movies.jsonp?query_term=${id}`).pipe(
		filter(([movie]) => !!movie),
		switchMap(([{ id }]) => getById(id))
	);

const getById = (id: number): Observable<YTSMovie> =>
	httpGet(`movie_details.jsonp?movie_id=${id}&with_cast=true`).pipe(
		filter(([movie]) => !!movie && !!movie.title_english),
		map(([movie]) => movie)
	);

export { search, getMovieByIMDBId };
