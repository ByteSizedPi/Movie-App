import { YTSMovie } from "src/app/modules/movies/types/YTSMovie";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EMPTY, from, Observable, of } from "rxjs";
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
} from "rxjs/operators";

type Response = { data: { movies: YTSMovie[]; movie: YTSMovie } };

@Injectable({
  providedIn: "root",
})
export class YTS_API_Service {
  private BASE_URL = "https://yts.mx/api/v2/";

  constructor(private http: HttpClient) {}

  //makes request to YTS API and map to movies Array using type()
  private httpGet = (apiString: string) =>
    this.http
      .get<Response>(this.BASE_URL + apiString)
      .pipe(map((res) => this.type(res)));

  //Map API results into movie array
  private type = ({ data: { movies, movie } }: Response): YTSMovie[] => {
    if (movies) return movies;
    if (movie) return [movie];
    return [];
  };

  search = (queryGroup: string): Observable<YTSMovie> =>
    this.httpGet(`list_movies.jsonp?query_term=${queryGroup}`).pipe(
      concatMap((arr) => from(arr)),
      mergeMap(({ id }) => this.getById(id).pipe(catchError(() => EMPTY)))
    );

  getMovieByIMDBId = (id: string): Observable<YTSMovie> =>
    this.httpGet(`list_movies.jsonp?query_term=${id}`).pipe(
      filter(([movie]) => !!movie),
      switchMap(([{ id }]) => this.getById(id))
    );

  private getById = (id: number) =>
    this.httpGet(`movie_details.jsonp?movie_id=${id}&with_cast=true`).pipe(
      map(([movie]) => movie)
    );
}
