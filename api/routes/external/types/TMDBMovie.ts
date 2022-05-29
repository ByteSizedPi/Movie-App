//review inside TMDBMovie
export type Review = {
	author: string;
	author_details: {
		name: string;
		username: string;
		avatar_path: string;
		rating: string;
	};
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
};

export type TMDBMovie = {
	id: number;
	imdb_id: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	budget: number;
	revenue: number;
	reviews: Review[];
	providers: {
		logo_path: string;
		provider_name: string;
	}[];
};

//possible return types from TMDB
export type Response = { results: TMDBMovie[] };
export type External = { movie_results: TMDBMovie[] };
export type ReviewObj = { results: Review[] };
export type Provider = { logo_path: string; provider_name: string };
export type ProviderObj = {
	results: {
		US: {
			link: string;
			flatrate: Provider[];
		};
	};
};
