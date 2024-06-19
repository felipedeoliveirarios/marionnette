import {Component, Input} from '@angular/core';
import {ChatService} from "../../services/chat/chat.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  get chatOptions() {
    return this.chatService.persistedChatOptions;
  };

  constructor(protected chatService: ChatService) {
  }

  createNewChat() {
    this.chatService.createNewChat();
  }

  selectChat(chatKey: string) {
    this.chatService.selectChat(chatKey);
  }
}
