import { WebtorrentService } from "src/app/shared/services/webtorrent.service";
import { MovieModalService } from "src/app/shared/services/movie-modal.service";
import { Movie } from "src/app/modules/movies/types/Movie";
import { Directive, HostListener, Input } from "@angular/core";
import { Torrent } from "../types/Types";
import { Router } from "@angular/router";
@Directive({
  selector: "[streamMovie]",
})
export class StreamMovieDirective {
  @Input() streamMovie: Movie;

  constructor(
    private modalService: MovieModalService,
    private torrentService: WebtorrentService,
    private router: Router
  ) {}

  @HostListener("click") onClick = () => {
    this.modalService.closeModal();
    const { torrents } = this.streamMovie;
    const { hash } = <Torrent>torrents.find((t) => t.quality === "1080p");
    this.torrentService.hash = hash;
    this.router.navigate(["/watch"]);
  };
}
