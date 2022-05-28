import { environment } from "./../../../../environments/environment.prod";
import { Review } from "./../types/Review";
import { MovieGroup } from "src/app/shared/types/Types";
import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TMDBMovie } from "../types/TMDBMovie";
import { concat, EMPTY, from, Observable, forkJoin } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";

//possible return types from TMDB
type Response = { results: TMDBMovie[] };
type External = { movie_results: TMDBMovie[] };
type ReviewObj = { results: Review[] };
type Provider = { logo_path: string; provider_name: string };
type ProviderObj = {
	results: {
		US: {
			link: string;
			flatrate: Provider[];
		};
	};
};
type Config = {
	images: {
		poster_sizes: string[];
		backdrop_sizes: string[];
		secure_base_url: string;
	};
};

@Injectable({
	providedIn: "root",
})
export class TMDB_API_Service implements OnInit {
	private API_KEY = environment.API_KEY;
	private KEY: string = `api_key=${this.API_KEY}`;
	private BASE_URL: string = "https://api.themoviedb.org/3/";
	private LANG: string = "&language=en-US";
	private IMG_URL: string;

	public posterSizes: string[];
	public backdropSizes: string[];

	constructor(private http: HttpClient) {
		this.config();
	}

	ngOnInit(): void {}
	//get image resolutions etc...
	config(): void {
		this.http
			.get<Config>(`${this.BASE_URL}configuration?api_key=${this.API_KEY}`)
			.subscribe(({ images }) => {
				({
					poster_sizes: this.posterSizes,
					backdrop_sizes: this.backdropSizes,
					secure_base_url: this.IMG_URL,
				} = images);
			});
	}

	//determine TMDB return type and reduce to movies in an array
	private type(res: any): TMDBMovie[] {
		if ((<Response>res).results) return (<Response>res).results;
		if ((<TMDBMovie>res).id) return [<TMDBMovie>res];
		if ((<External>res).movie_results) return (<External>res).movie_results;
		return [];
	}

	//makes request to TMDB API and map to movies Array using type()
	private httpGet = (
		apiString: string,
		imdb: string = ""
	): Observable<TMDBMovie[]> =>
		this.http
			.get(this.BASE_URL + apiString + this.KEY + this.LANG + imdb)
			.pipe(map((res) => this.type(res)));

	private httpGetReviews = (apiString: string): Observable<Review[]> =>
		this.http
			.get<ReviewObj>(this.BASE_URL + apiString + this.KEY)
			.pipe(map(({ results }) => results));

	private httpGetProviders = (apiString: string): Observable<Provider[]> =>
		this.http
			.get<ProviderObj>(this.BASE_URL + apiString + this.KEY)
			.pipe(
				map(({ results }) => (results.US?.flatrate ? results.US?.flatrate : []))
			);

	//get movie array by Group type
	getMovieGroup = (query: MovieGroup) =>
		this.getFull(
			query === "trending" ? `trending/all/week?` : `movie/${query}?`
		);

	//get recommended for specific movie
	getRecommended = (id: number) => this.getFull(`movie/${id}/recommendations?`);

	//get recommended for specific movie
	getSimilar = (id: number) => this.getFull(`movie/${id}/similar?`);

	//get movie group (filled with incomplete movies) then requery api by ids for full movies one by one
	private getFull = (queryGroup: string): Observable<TMDBMovie> =>
		this.httpGet(queryGroup).pipe(
			concatMap((arr) => from(arr)),
			mergeMap(({ id }) => this.getById(id).pipe(catchError(() => EMPTY)))
		);

	private getById = (id: number) => {
		let tasks = [];
		return forkJoin(
			this.httpGet(`movie/${id}?`),
			this.httpGetReviews(`movie/${id}/reviews?`),
			this.httpGetProviders(`movie/${id}/watch/providers?`)
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

	getMovieByIMDBId = (id: string) =>
		this.httpGet(`find/${id}?`, "&external_source=imdb_id").pipe(
			mergeMap(([{ id }]) => this.getById(id))
		);

	getMoviesByIMDBIds = (ids: string[]) =>
		concat(...ids.map((id) => this.getMovieByIMDBId(id)));
}
