import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDynamicClass]',
})
export class DynamicClassDirective {
  //@HostBinding('.c-share') isActive = false;

  constructor() {}

  @HostListener('click', ['$event']) onClick() {
    console.log('clicked');
    //this.isActive = !this.isActive;
  }
}
