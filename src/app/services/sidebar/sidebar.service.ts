import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  visible: boolean = false;

  constructor() { }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }
}
