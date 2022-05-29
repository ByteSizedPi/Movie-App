import { MoviesService } from "src/app/modules/movies/services/movies.service";
import { Component, OnInit } from "@angular/core";
import { MovieGroup, Scroller } from "src/app/shared/types/Types";

@Component({
	selector: "app-test-component",
	templateUrl: "./test-component.component.html",
	styleUrls: ["./test-component.component.scss"],
})
export class TestComponentComponent implements OnInit {
	constructor(private moviesService: MoviesService) {}

	groups: MovieGroup[] = [
		MovieGroup.NowPlaying,
		MovieGroup.Popular,
		MovieGroup.TopRated,
		MovieGroup.Upcoming,
	];

	ngOnInit(): void {}

	asScroller(i: number): Scroller {
		return {
			id: `list-scroller-${i}`,
			aspect: !(i % 2) ? 3 / 2 : 9 / 16,
			movies: this.moviesService.getMovieGroup(this.groups[i]),
		};
	}
}
