import {Component} from '@angular/core';
import {ChatService} from "../../services/chat/chat.service";
import {OpenAiService} from "../../services/open-ai/open-ai.service";
import {KeyModalService} from "../../services/key-modal/key-modal.service";
import {SidebarService} from "../../services/sidebar/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  get visible() {
    return this.sidebarService.visible;
  }

  get chatOptions() {
    return this.chatService.persistedChatOptions;
  };

  get isKeyPresent() {
    return this.openAiService.isKeyPresent();
  }

  constructor(protected chatService: ChatService,
              private openAiService: OpenAiService,
              private keyModalService: KeyModalService,
              private sidebarService: SidebarService) {
  }

  createNewChat() {
    this.chatService.createNewChat();
    this.hide();
  }

  selectChat(chatKey: string) {
    this.chatService.selectChat(chatKey);
    this.hide();
  }

  clearChatHistory() {
    this.chatService.clearChatHistory();
    this.hide();
  }

  openApiKeyModal() {
    this.hide();
    this.keyModalService.open();
  }

  hide() {
    this.sidebarService.hide();
  }

  show() {
    this.sidebarService.show();
  }
}
