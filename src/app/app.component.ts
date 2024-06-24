import {Component} from '@angular/core';
import {SidebarService} from "./services/sidebar/sidebar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private sidebarService: SidebarService) {
  }

  get visible() {
    return this.sidebarService.visible;
  }
}

export class Application {
  static title = 'Marionnette';
}
