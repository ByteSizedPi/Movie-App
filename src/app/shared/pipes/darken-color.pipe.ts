import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'darkenColor'
})
export class DarkenColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
