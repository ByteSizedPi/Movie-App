import { Pipe, PipeTransform } from "@angular/core";

type Provider = {
  logo_path: string;
};

@Pipe({
  name: "logo",
})
export class LogoPipe implements PipeTransform {
  private BASE = "https://image.tmdb.org/t/p/original";
  transform({ logo_path: url }: Provider): string {
    return url ? this.BASE + url : "";
  }
}
