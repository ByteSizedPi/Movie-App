import { NgModule } from "@angular/core";
import { ImgLoadDirective } from "src/app/shared/directives/img-load.directive";
import { ViewMovieDirective } from "./view-movie.directive";
import { StreamMovieDirective } from "./stream-movie.directive";
const DIRECTIVES = [ImgLoadDirective, ViewMovieDirective, StreamMovieDirective];
@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
export class DirectivesModule {}
