import { MovieModalService } from "src/app/shared/services/movie-modal.service";
import { Movie } from "src/app/modules/movies/types/Movie";
import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[viewMovie]",
})
export class ViewMovieDirective {
  @Input() viewMovie: Movie;

  constructor(private modalService: MovieModalService) {}

  @HostListener("click") onClick = () =>
    this.modalService.openModal(this.viewMovie);
}
