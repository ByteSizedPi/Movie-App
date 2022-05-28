import { TMDBMovie } from "./TMDBMovie";
import { YTSMovie } from "./YTSMovie";

type Config = {
	images: {
		poster_sizes: string[];
		backdrop_sizes: string[];
		secure_base_url: string;
	};
};

const API_KEY = process.env.API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const YTS_BASE_URL = "https://yts.mx/api/v2/";
const IMG_URL = "https://image.tmdb.org/t/p/";
const posterSizes: string[] = [
	"w92",
	"w154",
	"w185",
	"w342",
	"w500",
	"w780",
	"original",
];
const backdrop_sizes: string[] = ["w300", "w780", "w1280", "original"];
type TMDBorYTS = TMDBMovie | YTSMovie;

export {
	Config,
	API_KEY,
	TMDB_BASE_URL,
	YTS_BASE_URL,
	IMG_URL,
	posterSizes,
	backdrop_sizes,
	TMDBorYTS,
};
