import { SearchService } from "./../../../../shared/services/search.service";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { MoviesService } from "src/app/modules/movies/services/movies.service";
import { Movie } from "src/app/modules/movies/types/Movie";
import { MovieModalService } from "src/app/shared/services/movie-modal.service";
import {
  darkenColor,
  getTextColor,
  Id,
  mod,
  query,
} from "src/app/shared/services/Utils";
import { MovieGroup } from "src/app/shared/types/Types";
import { NavigationStart, Router } from "@angular/router";
import { ColorsService } from "src/app/shared/services/colors.service";
import { BackdropPipe } from "src/app/shared/pipes/backdrop.pipe";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private offset = 0;
  private interval: any;
  private lockCount = 1;
  movie: Movie;
  movies: Movie[] = [];
  colorsLoaded = false;

  constructor(
    public moviesService: MoviesService,
    public modalService: MovieModalService,
    private searchService: SearchService,
    public colors: ColorsService,
    private router: Router
  ) {
    let r = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        r.unsubscribe();
        this.pauseSlideShow();
      }
    });
  }

  ngOnInit(): void {
    this.modalService.onChange.subscribe((event) => {
      this.decide(!event);
    });
    this.searchService.onChange.subscribe((event) => {
      this.decide(!event);
    });

    this.detectVisibility();
    let movieSub = this.moviesService
      .getMovieGroup(MovieGroup.Trending)
      .subscribe((movies) => {
        movieSub.unsubscribe();
        this.movies = movies;
        this.getMovie();
        this.startSlideShow();
        this.getColors();
      });
  }

  startSlideShow() {
    this.lockCount--;
    if (this.interval || this.lockCount > 0) return;
    // console.log("start:", this.lockCount);
    this.interval = setInterval(() => {
      Id("header-img").style.opacity = "0";
      query(".title").style.opacity = "0";

      setTimeout(this.getMovie, 400);
      setTimeout(() => {
        query(".title").style.opacity = "1";
      }, 800);
    }, 20000);
  }

  pauseSlideShow = () => {
    this.lockCount++;
    // console.log("end:", this.lockCount);
    clearInterval(this.interval);
    this.interval = undefined;
  };

  getColors = () =>
    this.colors
      .getPalette(new BackdropPipe().transform(this.movie, 3))
      .then(() => (this.colorsLoaded = true));

  decide = (arg: boolean) => this[arg ? "startSlideShow" : "pauseSlideShow"]();

  detectVisibility() {
    document.addEventListener("visibilitychange", () =>
      this.decide(document.visibilityState === "visible")
    );
  }

  getStyles = (kind: "vibrant" | "muted") => {
    return {
      backgroundColor: this.colors.curColors[kind],
      color: getTextColor(this.colors.curColors[kind]),
    };
  };

  getMovie = () => {
    this.movie = this.movies[mod(this.offset++, this.movies.length)];
    this.getColors();
  };
}
