import {AfterViewInit, Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]'
})
export class TextareaAutoresizeDirective implements AfterViewInit{

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  resize() {
    this.elementRef.nativeElement.style.height = 'fit-content'; // Reset the height to auto
    this.elementRef.nativeElement.style.height = `${this.elementRef.nativeElement.scrollHeight}px`; // Set the height to the scroll height
  }

}
