import { Component } from '@angular/core';
import {Application} from "../../app.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly Application = Application;
}
