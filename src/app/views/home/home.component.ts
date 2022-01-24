import { TMDB_API_Service } from "src/app/modules/movies/services/tmdb-api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private tmdb: TMDB_API_Service) {}

  ngOnInit(): void {
    // this.tmdb
    //   .newGetFull("trending/all/week?")
    //   .subscribe((movie) => console.log(movie));
  }
}
