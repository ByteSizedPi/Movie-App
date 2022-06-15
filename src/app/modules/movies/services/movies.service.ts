import { TMDB_API_Service } from "src/app/modules/movies/services/tmdb-api.service";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { TMDBMovie } from "src/app/modules/movies/types/TMDBMovie";
import { YTSMovie } from "src/app/modules/movies/types/YTSMovie";
import { Injectable } from "@angular/core";
import { Movie } from "../types/Movie";
import { MovieGroup } from "src/app/shared/types/Types";

type TMDBorYTS = TMDBMovie | YTSMovie;

@Injectable({
	providedIn: "root",
})
export class MoviesService {
	constructor(private user_api: UserService, private http: HttpClient) {}

	private BASE_URL = "http://127.0.0.1:3000/api/movies/";

	private httpGet = (query: string) =>
		this.http.get<Movie[]>(this.BASE_URL + query);

	searchMovies = (query: string) => this.httpGet(`search=${query}`);

	getMovieGroup = (group: MovieGroup) => this.httpGet(`group=${group}`);

	getRecommended = (tmdb_id: number) => this.httpGet(`recommended=${tmdb_id}`);

	getSimilar = (tmdb_id: number) => this.httpGet(`similar=${tmdb_id}`);

	getShowList = () => this.user_api.getShowList();
}
