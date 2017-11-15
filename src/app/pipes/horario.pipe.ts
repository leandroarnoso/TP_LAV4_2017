import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horario'
})
export class HorarioPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    let fecha = new Date(value);
    return fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
  }

}
