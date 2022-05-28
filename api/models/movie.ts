import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
	logo_path: { type: String },
	provider_name: { type: String },
});

interface Provider {
	logo_path: string;
	provider_name: string;
}

const castSchema = new mongoose.Schema({
	name: { type: String },
	character_name: { type: String },
	url_small_image: { type: String },
	imdb_code: { type: String },
});

interface Cast {
	name: string;
	character_name: string;
	url_small_image: string;
	imdb_code: string;
}

const torrentSchema = new mongoose.Schema({
	url: { type: String },
	hash: { type: String },
	quality: { type: String },
	type: { type: String },
	seeds: { type: Number },
	peers: { type: Number },
	size: { type: String },
	size_bytes: { type: Number },
	date_uploaded: { type: String },
	date_uploaded_unix: { type: Number },
});

interface Torrent {
	url: string;
	hash: string;
	quality: string;
	type: string;
	seeds: number;
	peers: number;
	size: string;
	size_bytes: number;
	date_uploaded: string;
	date_uploaded_unix: number;
}

const reviewSchema = new mongoose.Schema({
	author: { type: String },
	author_details: {
		type: new mongoose.Schema({
			name: { type: String },
			username: { type: String },
			avatar_path: { type: String },
			rating: { type: String },
		}),
	},
	content: { type: String },
	created_at: { type: String },
	id: { type: String },
	updated_at: { type: String },
	url: { type: String },
});

interface Review {
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
}

const movieSchema = new mongoose.Schema({
	yts_id: { type: Number },
	tmdb_id: { type: Number },
	imdb_id: { type: Number },

	budget: { type: Number },
	description_full: { type: String },
	genres: { type: [String] },
	language: { type: String },
	mpa_rating: { type: String },
	providers: { type: [providerSchema] },

	runtime: { type: Number },
	rating: { type: Number },
	revenue: { type: Number },
	summary: { type: String },
	title: { type: String },
	year: { type: Number },
	yt_trailer: { type: String },

	poster: { type: String },
	backdrop: { type: String },

	reviews: { type: [reviewSchema] },
	cast: { type: [castSchema] },
	torrents: { type: [torrentSchema] },
});

export interface Movie {
	yts_id: number;
	tmdb_id: number;
	imdb_id: number;

	budget: number;
	description_full: string;
	genres: string[];
	language: string;
	mpa_rating: string;
	providers: Provider[];

	runtime: number;
	rating: number;
	revenue: number;
	summary: string;
	title: string;
	year: number;
	yt_trailer: string;

	poster: string;
	backdrop: string;

	reviews: Review[];
	cast: Cast[];
	torrents: Torrent[];
}

export const MovieModel = mongoose.model("Movie", movieSchema);
