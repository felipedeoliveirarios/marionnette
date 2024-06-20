import {Component, ViewChild, OnInit} from '@angular/core';
import {OpenAiService} from "../../services/open-ai/open-ai.service";
import {ChatCompletion, Message} from "./chat";
import {ChatService} from "../../services/chat/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  preserveWhitespaces: true,
})
export class ChatComponent implements OnInit{
  prompt: string = '';

  loading: boolean = false;

  selectedModel = this.modelOptions[0];

  @ViewChild('scroll', {static: true})
  scroll: any;

  get messageHistory() {
    return this.chatService.currentChat.messages;
  }

  get currentChat() {
    return this.chatService.currentChat;
  }

  get modelOptions() {
    return this.openAiService.modelOptions;
  }

  constructor(private openAiService: OpenAiService,
              protected chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.chatChanged.subscribe(() => {
      this.scrollToBottom();
      this.prompt = '';
    });
  }

  sendPrompt() {
    const userMessage = new Message();
    userMessage.content = this.prompt;
    userMessage.role = 'user';

    if (this.messageHistory.length == 0) {
      this.chatService.saveNewChatKey();
    }

    this.currentChat.model = this.selectedModel.value;
    this.messageHistory.push(userMessage);
    this.scrollToBottom();

    this.loading = true;
    this.openAiService.sendChat(this.messageHistory, this.currentChat).subscribe((data: ChatCompletion) => {
      this.messageHistory.push(data.choices[0].message);
      this.loading = false;
      this.chatService.saveCurrentChat();
      this.prompt = '';
      this.scrollToBottom();
    }, error => {
      console.error('Error fetching data: ', error);
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.scroll.nativeElement.scrollTo({
        left: 0,
        top: this.scroll.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 10);
  }
}
