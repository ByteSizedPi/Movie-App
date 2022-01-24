import { Observable } from "rxjs";
import { Movie } from "src/app/modules/movies/types/Movie";

export enum MovieGroup {
  NowPlaying = "now_playing",
  Popular = "popular",
  TopRated = "top_rated",
  Upcoming = "upcoming",
  Trending = "trending",
}

export type Resolution = 0 | 1 | 2 | 3;

export type Scroller = {
  id: string;
  aspect: number;
  movies: Observable<Movie[]>;
  showProgress?: boolean;
};

export type Colors = {
  vibrant: string | undefined;
  muted: string | undefined;
  lightVibrant: string | undefined;
  lightMuted: string | undefined;
  darkVibrant: string | undefined;
  darkMuted: string | undefined;
  v_text: string | undefined;
  m_text: string | undefined;
  lv_text: string | undefined;
  lm_text: string | undefined;
  dv_text: string | undefined;
  dm_text: string | undefined;
};

export type Torrent = {
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
};
