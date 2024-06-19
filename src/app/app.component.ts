import {Component} from '@angular/core';
import {OpenAiService} from "./services/open-ai/open-ai.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}

export class Application {
  static title = 'Marionnette';
}
