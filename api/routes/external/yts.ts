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
const httpGet = (apiString: string) =>
	http.get<Response>(YTS_BASE_URL + apiString).pipe(map((res) => type(res)));

//Map API results into movie array
const type = ({ data: { movies, movie } }: Response): YTSMovie[] => {
	if (movies) return movies;
	if (movie) return [movie];
	return [];
};

const search = (queryGroup: string): Observable<YTSMovie> =>
	httpGet(`list_movies.jsonp?query_term=${queryGroup}`).pipe(
		concatMap((arr) => from(arr)),
		mergeMap(({ id }) => getById(id).pipe(catchError(() => EMPTY)))
	);

const getMovieByIMDBId = (id: string): Observable<YTSMovie> =>
	httpGet(`list_movies.jsonp?query_term=${id}`).pipe(
		filter(([movie]) => !!movie),
		switchMap(([{ id }]) => getById(id))
	);

const getById = (id: number): Observable<YTSMovie> =>
	httpGet(`movie_details.jsonp?movie_id=${id}&with_cast=true`).pipe(
		map(([movie]) => movie)
	);

export { search, getMovieByIMDBId, getById };
