import { Component } from '@angular/core';
import {Application} from "../../app.component";
import {OpenAiService} from "../../services/open-ai/open-ai.service";
import {KeyModalService} from "../../services/key-modal/key-modal.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly Application = Application;

  get isKeyPresent() {
    return this.openAiService.isKeyPresent();
  }

  constructor(private openAiService: OpenAiService,
              private keyModalService: KeyModalService) {
  }

  openApiKeyModal() {
    this.keyModalService.open();
  }
}
