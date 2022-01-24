import { Observable } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WebtorrentService {
  private BASE_URL = "http://localhost:3000/api/movies/";
  private curMovie: string = "AB93436D57DAF59414425F329EB2DF96D713A64A";

  constructor(private http: HttpClient) {}

  getMovies = () =>
    this.http.get(this.BASE_URL + "add/" + this.curMovie, {
      responseType: "text",
    });

  set hash(hash: string) {
    this.curMovie = hash;
  }
}
