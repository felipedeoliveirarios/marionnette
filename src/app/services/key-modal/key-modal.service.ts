import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyModalService {
  public isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
