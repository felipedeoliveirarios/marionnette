import { Component } from '@angular/core';
import {OpenAiService} from "../../services/open-ai/open-ai.service";
import {ChatCompletion, Message} from "./chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  prompt: string = '';
  response: string = '';

  loading: boolean = false;

  messages: Message[] = []

  selectedModel = 'gpt-3.5-turbo';

  constructor(private openAiService: OpenAiService) { }

  sendPrompt() {
    const userMessage = new Message();
    userMessage.content = this.prompt;
    userMessage.role = 'user';
    this.messages.push(userMessage);

    this.loading = true;
    this.openAiService.sendChat(this.messages, this.selectedModel).subscribe((data: ChatCompletion) => {
      this.messages.push(data.choices[0].message);
      this.loading = false;
    }, error => {
      console.error('Error fetching data: ', error);
    });
  }
}
