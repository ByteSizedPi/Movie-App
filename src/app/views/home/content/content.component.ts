import { MoviesService } from "../../../modules/movies/services/movies.service";
import { Component, OnInit } from "@angular/core";
import { MovieGroup, Scroller } from "src/app/shared/types/Types";
import { asTitle } from "src/app/shared/services/Utils";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit {
  groups: MovieGroup[] = [
    MovieGroup.NowPlaying,
    MovieGroup.Popular,
    MovieGroup.TopRated,
    MovieGroup.Upcoming,
  ];
  asTitle = asTitle;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {}

  asScroller(i: number): Scroller {
    return {
      id: `list-scroller-${i}`,
      aspect: !(i % 2) ? 3 / 2 : 9 / 16,
      movies: this.moviesService.getMovieGroup(this.groups[i]),
    };
  }
}
