import { Component } from "@angular/core";
import { MoviesService } from "src/app/modules/movies/services/movies.service";
import { MovieGroup, Scroller } from "src/app/shared/types/Types";
import { asTitle } from "src/app/shared/services/Utils";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
	constructor(private moviesService: MoviesService) {}
	groups: MovieGroup[] = [
		MovieGroup.NowPlaying,
		MovieGroup.Popular,
		MovieGroup.TopRated,
		MovieGroup.Upcoming,
	];
	asTitle = asTitle;

	asScroller(i: number): Scroller {
		return {
			movies: this.moviesService.getMovieGroup(this.groups[i]),
		};
	}
}
