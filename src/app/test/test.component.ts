import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/modules/movies/services/movies.service";

@Component({
	selector: "app-test",
	templateUrl: "./test.component.html",
	styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
	constructor(public movies: MoviesService) {}

	ngOnInit(): void {}
}