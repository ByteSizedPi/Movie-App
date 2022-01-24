import { PipesModule } from "./../../shared/pipes/pipes.module";
import { DirectivesModule } from "./../../shared/directives/directives.module";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { ScrollerComponent } from "./components/scroller/scroller.component";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [HeaderComponent, ScrollerComponent],
  imports: [CommonModule, DirectivesModule, PipesModule],
  exports: [HeaderComponent, ScrollerComponent],
})
export class MoviesModule {}
