import { UserService } from "./user.service";
import { TMDBMovie } from "src/app/modules/movies/types/TMDBMovie";
import { YTSMovie } from "src/app/modules/movies/types/YTSMovie";
import { YTS_API_Service } from "./yts-api.service";
import { TMDB_API_Service } from "./tmdb-api.service";
import { Injectable } from "@angular/core";
import { Movie } from "../types/Movie";
import { Observable } from "rxjs";
import { map, filter, mergeMap, toArray } from "rxjs/operators";
import { MovieGroup, Resolution } from "src/app/shared/types/Types";

type TMDBorYTS = TMDBMovie | YTSMovie;

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(
    private tmdb_api: TMDB_API_Service,
    private yts_api: YTS_API_Service,
    private user_api: UserService
  ) {}

  //Different movie group requests
  searchMovies = (query: string) =>
    this.get(
      () => this.yts_api.search(query),
      (movie) => this.tmdb_api.getMovieByIMDBId((<YTSMovie>movie).imdb_code)
    );

  getMovieGroup = (group: MovieGroup) =>
    this.YTSIMDB(() => this.tmdb_api.getMovieGroup(group));

  getRecommended = (tmdb_id: number) =>
    this.YTSIMDB(() => this.tmdb_api.getRecommended(tmdb_id));

  getSimilar = (tmdb_id: number) =>
    this.YTSIMDB(() => this.tmdb_api.getSimilar(tmdb_id));

  getShowList = () => this.user_api.getShowList();

  //helper function where second function is to get movies from YTS by ID
  private YTSIMDB = (f: () => Observable<TMDBorYTS>) =>
    this.get(f, (movie) =>
      this.yts_api.getMovieByIMDBId((<TMDBMovie>movie).imdb_id)
    );

  //query first api for movie/movies then get same movie from other api, return as array
  private get = (
    f1: () => Observable<TMDBorYTS>,
    f2: (movie: TMDBorYTS) => Observable<TMDBorYTS>
  ): Observable<Movie[]> =>
    f1().pipe(
      mergeMap((movie1) =>
        f2(movie1).pipe(
          filter((movie) => !!movie),
          map((movie2) => this.mergeTypes(movie1, movie2)),
          filter((movie) => this.isValidMovie(movie))
        )
      ),
      toArray()
    );

  //merge TMDB movie and YTS movie into Movie type
  private mergeTypes = (tmdb: TMDBorYTS, yts: TMDBorYTS): Movie => {
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

  private isValidMovie = (movie: Movie): boolean =>
    !!movie.title && !!movie.summary;
}
