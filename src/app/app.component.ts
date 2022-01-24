import { MovieModalService } from "./shared/services/movie-modal.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "IMDB-clone";

  constructor(public modal: MovieModalService) {}

  ngOnInit(): void {}
}
