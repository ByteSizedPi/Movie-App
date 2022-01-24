import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[imgLoad]",
})
export class ImgLoadDirective {
  constructor({ nativeElement: img }: ElementRef) {
    img.style.opacity = 0;
    img.setAttribute("loading", "lazy");
    img.onload = () => (img.style.opacity = 1);
  }
}
