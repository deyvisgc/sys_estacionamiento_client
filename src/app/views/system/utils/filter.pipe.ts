import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {

    if (!arg || arg.length < 3) return value
    return value.filter((f: any) => f.person.name.toLowerCase().includes(arg.toLowerCase()) || f.person.number.toLowerCase().includes(arg.toLowerCase())
    || f.email.toLowerCase().includes(arg.toLowerCase()))
  }

}
