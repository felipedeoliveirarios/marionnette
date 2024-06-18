import { Component } from '@angular/core';
import {OpenAiService} from "../../services/open-ai/open-ai.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  prompt: string = '';
  response: string = '';

  constructor(private openAiService: OpenAiService) { }

  sendPrompt() {
    this.openAiService.getResponse(this.prompt).subscribe((data: any) => {
      this.response = data.choices[0].message.content;
    }, error => {
      console.error('Error fetching data: ', error);
    });
  }
}
