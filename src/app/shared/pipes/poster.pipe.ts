import { Resolution } from "src/app/shared/types/Types";
import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "src/app/modules/movies/types/Movie";

@Pipe({
  name: "poster",
})
export class PosterPipe implements PipeTransform {
  private posterSizes = [
    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
    "original",
  ];
  private BASE = "https://image.tmdb.org/t/p/";
  transform({ poster: url }: Movie, res: Resolution): string {
    return url ? this.BASE + this.posterSizes[res] + url : "";
    // : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    // : "src/assets/empty.png";
  }
}
