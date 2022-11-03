import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  //view container ref provides the object to interact with the element in the DOM
  constructor(public viewContainerRef: ViewContainerRef) {}
}
