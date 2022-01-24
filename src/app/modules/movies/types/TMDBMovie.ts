import { Review } from "./Review";

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
