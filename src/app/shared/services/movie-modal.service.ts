import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Movie } from "../../modules/movies/types/Movie";
import { Scroller } from "../types/Types";
import { MoviesService } from "../../modules/movies/services/movies.service";
import { Id, query, BODY } from "./Utils";

@Injectable({
  providedIn: "root",
})
export class MovieModalService {
  private curMovie: Movie;
  isOpen = false;
  colorLoaded = false;
  onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private moviesService: MoviesService) {}

  get movie() {
    return { ...this.curMovie };
  }

  openModal = (movie: Movie) => {
    const open = () => {
      this.onChange.emit(true);
      this.curMovie = movie;
      this.isOpen = true;
      this.lockScroll();
    };

    if (this.isOpen) {
      this.closeModal();
      setTimeout(() => open(), 201);
    } else {
      open();
    }
  };

  closeModal = () => {
    Id("movie-modal").style.animation = "slide-out .2s forwards";
    Id("backdrop").style.animation = "fade-out .2s forwards";
    setTimeout(() => {
      this.isOpen = false;
      this.onChange.emit(false);
    }, 200);
    this.allowScroll();
  };

  lockScroll = () => (BODY.style.overflowY = "hidden");
  allowScroll = () => (BODY.style.overflowY = "auto");

  recommendedScroller(): Scroller {
    return {
      id: `recommended-scroller`,
      aspect: 3 / 2,
      movies: this.moviesService.getRecommended(this.curMovie.tmdb_id),
    };
  }

  similarScroller(): Scroller {
    return {
      id: `similar-scroller`,
      aspect: 3 / 2,
      movies: this.moviesService.getSimilar(this.curMovie.tmdb_id),
    };
  }
}
