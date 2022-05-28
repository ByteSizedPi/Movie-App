import { EMPTYMOVIE } from "./../../../../shared/services/Utils";
import { Component, Input, OnInit } from "@angular/core";
import { MovieModalService } from "src/app/shared/services/movie-modal.service";
import { Id, constrain, For } from "src/app/shared/services/Utils";
import { Scroller } from "src/app/shared/types/Types";
import { TMDB_API_Service } from "../../services/tmdb-api.service";
import { Movie } from "../../types/Movie";

@Component({
	selector: "app-scroller",
	templateUrl: "./scroller.component.html",
	styleUrls: ["./scroller.component.scss"],
})
export class ScrollerComponent implements OnInit {
	movies: Movie[];
	offset = 0;
	itemsInARow = 0;
	padding = 8;
	canLeft = false;
	canRight = false;
	loaded = false;

	@Input() init: Scroller;

	constructor(public modal: MovieModalService, public tmdb: TMDB_API_Service) {}

	ngOnInit(): void {
		let sub = this.init.movies.subscribe((movies) => {
			this.movies = movies;
			console.log(movies);
			sub.unsubscribe();
			this.loaded = true;
			this.translate();
		});
	}

	size = () => ({
		width: `${this.calcWidth()}px`,
		height: `${this.calcWidth() * 1.5}px`,
	});

	containerExists = () => !!Id(this.init.id);

	getMovies = () => {
		if (Id(this.init.id)) this.calcWidth();
		let temp: Movie[] = [];
		For(() => temp.push(EMPTYMOVIE), this.itemsInARow + 1);
		return this.movies ? this.movies : temp;
	};

	canScroll() {
		this.canRight = this.offset < this.movies?.length - this.itemsInARow;
		this.canLeft = this.offset > 0;
	}

	calcWidth() {
		const max_width = 180;
		const contWidth = Id(this.init.id).clientWidth - this.calcMargins();
		this.itemsInARow = Math.ceil(contWidth / max_width);
		return contWidth / this.itemsInARow - this.padding;
	}

	calcMargins = () => 2 * document.documentElement.clientWidth * 0.04;

	translate(dir: number = 0) {
		const newWidth = this.calcWidth();
		const newOffset = this.offset + dir * this.itemsInARow;
		var len = this.movies ? this.movies.length : 0;
		var max_offset = constrain(len - this.itemsInARow, 0, len);
		this.offset = constrain(newOffset, 0, max_offset);
		Id(this.init.id).style.transition = dir === 0 ? "none" : "transform .5s";
		Id(this.init.id).style.transform = `translateX(${
			-this.offset * (newWidth + this.padding)
		}px)`;
		this.canScroll();
	}
}
