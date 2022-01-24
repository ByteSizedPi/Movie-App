import { MoviesService } from "src/app/modules/movies/services/movies.service";
import { Component, OnInit } from "@angular/core";
import { Scroller } from "../../shared/types/Types";
import { UserService } from "../../modules/movies/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  public loaded = false;

  constructor(public user: UserService, private moviesService: MoviesService) {}

  ngOnInit(): void {}

  asScroller(i: number): Scroller {
    return {
      id: `home-scroller-${i}`,
      aspect: !(i % 2) ? 3 / 2 : 9 / 16,
      movies: this.moviesService.getShowList(),
    };
  }
}
