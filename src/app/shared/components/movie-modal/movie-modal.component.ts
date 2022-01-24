import { UserService } from "../../../modules/movies/services/user.service";
import { ColorsService } from "../../services/colors.service";
import { Router } from "@angular/router";
import { MovieModalService } from "../../services/movie-modal.service";
import { Component, OnInit } from "@angular/core";
import { WebtorrentService } from "../../services/webtorrent.service";
import { Torrent } from "src/app/shared/types/Types";
import { MoviesService } from "src/app/modules/movies/services/movies.service";
import { darkenColor, getTextColor, query } from "../../services/Utils";
import { BackdropPipe } from "src/app/shared/pipes/backdrop.pipe";

@Component({
  selector: "app-movie-modal",
  templateUrl: "./movie-modal.component.html",
  styleUrls: ["./movie-modal.component.scss"],
})
export class MovieModalComponent implements OnInit {
  trailerShown: boolean = false;
  listPending = false;
  isListed = false;
  colorsLoaded = false;
  movie = this.modal.movie;
  showMore = false;
  getTextColor = getTextColor;

  constructor(
    public modal: MovieModalService,
    public colors: ColorsService,
    public user: UserService
  ) {}

  ngOnInit(): void {
    this.colors
      .getPalette(new BackdropPipe().transform(this.movie, 3))
      .then(() => (this.colorsLoaded = true));
  }

  getGenre() {
    return {
      color: this.colors.curColors.lightVibrant,
      backgroundColor: `${this.colors.curColors.darkMuted}40`,
      border: `1px solid ${this.colors.curColors.lightVibrant}`,
    };
  }

  getTrailer = () => this.movie.yt_trailer;

  // toggleTrailer() {
  //   this.trailerShown = !this.trailerShown;
  //   query(".button-container").classList.toggle("shift-up");
  // }

  toggleList() {
    this.listPending = true;
    this.user.appendShowList(this.movie).subscribe(
      (results) => (this.listPending = false),
      (err) => console.log(err)
    );
  }

  toggleMore() {
    this.showMore = !this.showMore;
  }

  borderTop() {
    return { borderTop: `5rem solid${this.colors.curColors.vibrant}` };
  }

  getStyles = () => {
    return {
      backgroundColor: darkenColor(
        this.colors.curColors.vibrant,
        this.listPending ? 0.5 : 1
      ),
      color: this.colors.curColors.vibrant,
    };
  };

  getListIcon = () =>
    `assets/${this.isListed ? "minus-" : "plus-"}${this.getIconColor()}.svg`;

  getIconColor = () =>
    getTextColor(this.colors.curColors.vibrant) === "#fff" ? "white" : "black";
}
