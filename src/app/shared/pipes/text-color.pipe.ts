import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textColor'
})
export class TextColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
