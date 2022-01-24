import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "runtime",
})
export class RuntimePipe implements PipeTransform {
  transform = (mins: number): string =>
    `${Math.floor(mins / 60)}h${mins % 60}min`;
}
