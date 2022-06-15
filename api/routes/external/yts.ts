import { YTSMovie } from "./types/YTSMovie";
import { http } from "./movies";
import { YTS_BASE_URL } from "./types/Other";
import { Observable } from "rxjs";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";

type Response = { data: { movies: YTSMovie[]; movie: YTSMovie } };

//makes request to YTS API and map to movies Array using type()
const httpGet = (apiString: string): Observable<YTSMovie[]> => {
	const url = YTS_BASE_URL + apiString;
	return http.get<Response>(url).pipe(
		map((res) => type(res)),
		catchError(() => [])
	);
};

//Map API results into movie array
const type = ({ data: { movies, movie } }: Response): YTSMovie[] =>
	movies ?? [movie] ?? [];

const search = (queryGroup: string): Observable<YTSMovie> =>
	httpGet(`list_movies.jsonp?query_term=${queryGroup}`).pipe(
		switchMap((arr) => arr),
		mergeMap(({ id }) => getById(id))
	);

const getMovieByIMDBId = (id: string): Observable<YTSMovie> =>
	httpGet(`list_movies.jsonp?query_term=${id}`).pipe(
		switchMap(([{ id }]) => getById(id))
	);

const getById = (id: number): Observable<YTSMovie> =>
	httpGet(`movie_details.jsonp?movie_id=${id}&with_cast=true`).pipe(
		map(([movie]) => movie)
	);

export { search, getMovieByIMDBId };
