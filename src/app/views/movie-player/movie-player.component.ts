import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { WebtorrentService } from "src/app/shared/services/webtorrent.service";

@Component({
  selector: "app-movie-player",
  templateUrl: "./movie-player.component.html",
  styleUrls: ["./movie-player.component.scss"],
})
export class MoviePlayerComponent implements OnInit {
  private BASE_URL = "http://localhost:3000/api/movies/";
  public movieStream: any;

  constructor(
    public torrentService: WebtorrentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.torrentService.getMovies().subscribe((infoHash: any) => {
      this.movieStream = this.BASE_URL + "stream/" + infoHash;
    });
  }
}
