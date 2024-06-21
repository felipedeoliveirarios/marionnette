import { Component } from '@angular/core';
import {OpenAiService} from "../../services/open-ai/open-ai.service";
import {KeyModalService} from "../../services/key-modal/key-modal.service";

@Component({
  selector: 'app-key-modal',
  templateUrl: './key-modal.component.html',
  styleUrl: './key-modal.component.scss'
})
export class KeyModalComponent {
  apiKeyInputValue: string = '';

  get hasKey() {
    return this.openAiService.isKeyPresent();
  }

  get isVisible() {
    return this.keyModalService.isOpen;
  }

  constructor(private openAiService: OpenAiService,
              private keyModalService: KeyModalService) {
  }

  close(){
    this.apiKeyInputValue = '';
    this.keyModalService.close();
  }

  save() {
    this.openAiService.apiKey = this.apiKeyInputValue;
    this.close();
  }

  delete () {
    this.openAiService.clearKey();
    this.close();
  }
}
