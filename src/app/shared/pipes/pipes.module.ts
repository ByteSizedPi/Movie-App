import { AvatarPipe } from "./avatar.pipe";
import { TextColorPipe } from "./text-color.pipe";
import { DarkenColorPipe } from "./darken-color.pipe";
import { NgModule } from "@angular/core";
import { BackdropPipe } from "./backdrop.pipe";
import { PosterPipe } from "./poster.pipe";
import { RuntimePipe } from "./runtime.pipe";
import { LogoPipe } from "./logo.pipe";
const PIPES = [
  BackdropPipe,
  PosterPipe,
  RuntimePipe,
  DarkenColorPipe,
  TextColorPipe,
  AvatarPipe,
  LogoPipe,
];
@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}
