import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';
import {ElementRef} from "@angular/core";

describe('TextareaAutoresizeDirective', () => {
  it('should create an instance', () => {
    const directive = new TextareaAutoresizeDirective(new ElementRef<any>());
    expect(directive).toBeTruthy();
  });
});
