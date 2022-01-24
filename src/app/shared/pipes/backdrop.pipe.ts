import { Movie } from "src/app/modules/movies/types/Movie";
import { Resolution } from "src/app/shared/types/Types";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "backdrop",
})
export class BackdropPipe implements PipeTransform {
  private backdropSizes = ["w300", "w780", "w1280", "original"];
  private BASE = "https://image.tmdb.org/t/p/";
  transform({ backdrop: url }: Movie, res: Resolution): string {
    return url
      ? this.BASE + this.backdropSizes[res] + url
      : "src/assets/no-image-1.png";
  }
}
