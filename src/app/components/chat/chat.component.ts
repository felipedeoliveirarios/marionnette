import {Component, ViewChild, OnInit} from '@angular/core';
import {OpenAiService} from "../../services/open-ai/open-ai.service";
import {ChatCompletion, Message} from "./chat";
import {ChatService} from "../../services/chat/chat.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  preserveWhitespaces: true,
})
export class ChatComponent implements OnInit {
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

  get titleRegex() {
    return this.chatService.titleRegex;
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

    const isNewChat = this.messageHistory.length == 0;

    this.currentChat.model = this.selectedModel.value;
    this.messageHistory.push(userMessage);
    this.scrollToBottom();

    this.loading = true;
    this.openAiService.sendChat(this.currentChat)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe((chatCompletion: ChatCompletion) => {
        this.messageHistory.push(chatCompletion.choices[0].message);

        this.currentChat.usage.prompt_tokens += chatCompletion.usage.prompt_tokens;
        this.currentChat.usage.completion_tokens += chatCompletion.usage.completion_tokens;
        this.currentChat.usage.total_tokens += chatCompletion.usage.total_tokens;

        this.chatService.saveCurrentChat();

        if (isNewChat) {
          this.chatService.saveNewChatKey();
        }

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
