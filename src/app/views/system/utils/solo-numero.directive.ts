
import { Directive, ElementRef, HostListener, Output } from '@angular/core';
@Directive({
  selector: '[appSoloNumero]'
})
export class SoloNumeroDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const value = this._el.nativeElement.value
    this._el.nativeElement.value = value.substring(0, 11).replace(/[a-zA-Z/\W|_]/g,'')
    const valueNew = this._el.nativeElement.value
    if (value !== valueNew) {
      event.stopPropagation()
    }
  }

}
