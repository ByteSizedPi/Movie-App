import { MovieModalService } from "src/app/shared/services/movie-modal.service";
import { BODY } from "./Utils";
import { Movie } from "src/app/modules/movies/types/Movie";
import { MoviesService } from "../../modules/movies/services/movies.service";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MovieGroup } from "../types/Types";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	private open: boolean = false;
	private movies: Observable<Movie[]>;
	private searchTerm: string;
	animation: string = "slide-in 0.2s";
	emitSearch: EventEmitter<Observable<Movie[]>> = new EventEmitter();
	onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private movies_service: MoviesService,
		private modalService: MovieModalService
	) {}

	search = (query: string) => {
		this.searchTerm = query;
		if (!this.open) this.openModal();
		if (this.modalService.isOpen) this.modalService.closeModal();

		let { searchMovies, getMovieGroup } = this.movies_service;
		this.emitSearch.emit(
			query ? searchMovies(query) : getMovieGroup(MovieGroup.Trending)
		);
	};

	results = () => this.movies;

	get isOpen() {
		return this.open;
	}

	get term() {
		return this.searchTerm;
	}

	closeModal = () => {
		this.animation = "fade-out 0.2s";

		setTimeout(() => {
			this.open = false;
			BODY.style.overflowY = "auto";
			this.animation = "fade-in 0.2s";
			this.onChange.emit(false);
		}, 200);
	};

	openModal = () => {
		BODY.style.overflowY = "hidden";
		this.open = true;
		this.onChange.emit(true);
	};
}
