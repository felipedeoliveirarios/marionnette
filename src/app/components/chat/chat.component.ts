import {Component} from '@angular/core';
import {OpenAiService} from "../../services/open-ai/open-ai.service";
import {ChatCompletion, Message} from "./chat";
import {ChatService} from "../../services/chat/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  prompt: string = '';

  loading: boolean = false;

  selectedModel = 'gpt-3.5-turbo';

  get messageHistory() {
    return this.chatService.currentChat.messages;
  }

  get currentChat() {
    return this.chatService.currentChat;
  }

  constructor(private openAiService: OpenAiService,
              protected chatService: ChatService) {
  }

  sendPrompt() {
    const userMessage = new Message();
    userMessage.content = this.prompt;
    userMessage.role = 'user';

    if (this.messageHistory.length == 0) {
      this.chatService.saveNewChatKey();
    }

    this.currentChat.model = this.selectedModel;
    this.messageHistory.push(userMessage);

    this.loading = true;
    this.openAiService.sendChat(this.messageHistory, this.currentChat).subscribe((data: ChatCompletion) => {
      this.messageHistory.push(data.choices[0].message);
      this.loading = false;
      this.chatService.saveCurrentChat();
      this.prompt = '';
    }, error => {
      console.error('Error fetching data: ', error);
    });
  }
}
