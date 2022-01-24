import { TMDBMovie } from "./../../modules/movies/types/TMDBMovie";
import { Movie } from "src/app/modules/movies/types/Movie";
export const mod = (val: number, base: number) => (base + (val % base)) % base;

export const constrain = (num: number, min: number, max: number) =>
  min * +(num < min) + max * +(num > max) + num * +(num <= max && num >= min);

export const asTitle = (title: string) => title.replace(/_/g, " ");

export const onLoad = ({ target }: Event) => {
  (<HTMLElement>target).style.opacity = "1";
};

export const getTextColor = (hex: string = "#fff") => {
  return getHex(hex, 1, 3) * 0.299 +
    getHex(hex, 3, 5) * 0.587 +
    getHex(hex, 5, 7) * 0.114 >
    150
    ? "#000"
    : "#fff";
};

const getHex = (hex: string, from: number, to: number) =>
  parseInt(hex.substring(from, to), 16);

export const darkenColor = (hex: string = "#000000", perc: number) => {
  let r = getHex(hex, 1, 3) * perc;
  let g = getHex(hex, 3, 5) * perc;
  let b = getHex(hex, 5, 7) * perc;
  return `rgb(${r},${g},${b})`;
};

export const EMPTYMOVIE: Movie = {
  yts_id: 0,
  tmdb_id: 0,
  imdb_id: "",
  title: "",
  year: 0,
  rating: 0,
  runtime: 0,
  budget: 0,
  revenue: 0,
  genres: [],
  summary: "",
  description_full: "",
  yt_trailer: "",
  language: "",
  mpa_rating: "",
  poster: "",
  backdrop: "",
  cast: [],
  torrents: [],
  reviews: [],
  providers: [],
};

export const EMPTYTMDB: TMDBMovie = {
  id: 0,
  imdb_id: "",
  poster_path: "",
  backdrop_path: "",
  overview: "",
  budget: 0,
  revenue: 0,
  reviews: [],
  providers: [],
};

export const For = (fn: () => void, num: number) => {
  for (let i = 0; i < num; i++) fn();
};

export const Id = (s: string) => <HTMLElement>document.getElementById(s);
export const query = (s: string) => <HTMLElement>document.querySelector(s);
export const BODY = query("body");
