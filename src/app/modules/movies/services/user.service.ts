import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Movie } from "../types/Movie";
import { MoviesService } from "./movies.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private BASE_URL = "http://localhost:3000/api/users/";
  private user = false;
  isRefreshing = false;

  private username = "johan";

  constructor(private http: HttpClient) {}

  getShowList = () =>
    this.http.get<Movie[]>(`${this.BASE_URL}list/username=${this.username}`);

  appendShowList = (movie: Movie) => {
    this.refreshList();
    return this.http.post(`${this.BASE_URL}list/username=${this.username}`, {
      show: movie,
    });
  };

  refreshList = () => {
    this.isRefreshing = true;
    setTimeout(() => (this.isRefreshing = false), 10);
  };

  userExists = () => this.user;
  login = () => (this.user = true);
  logout = () => (this.user = false);

  verifyUsername = (username: string) =>
    this.http.get(this.BASE_URL + username);

  verifyUser = (body: { username: string; password: string }) =>
    this.http.post(this.BASE_URL, body).pipe(
      map((res: any) => {
        this.user = !res.error;
        this.username = body.username;
        return res;
      })
    );

  toggleListItem = (movie: Movie) => {
    // this.refreshList();

    return this.http.post(`${this.BASE_URL}list/${this.username}`, {
      imdb_id: movie.imdb_id,
    });
  };

  getListIDs = () =>
    this.http.get<string[]>(`${this.BASE_URL}list/${this.username}`);

  // getList = () =>
  // 	new Observable<Movie>((observer) =>
  // 		this.getListIDs().subscribe((ids) =>
  // 			this.movies.getList(ids).subscribe(
  // 				(movie) => observer.next(movie),
  // 				(err) => {},
  // 				() => observer.complete()
  // 			)
  // 		)
  // 	);
}
