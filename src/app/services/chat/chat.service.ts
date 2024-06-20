import {EventEmitter, Injectable} from '@angular/core';
import {Chat} from "../../components/chat/chat";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatKeysKey = 'CHAT_KEYS'

  currentChat: Chat = new Chat();
  savedChatKeys: string[] = [];
  persistedChatOptions: {label: string, value: string}[] = [];

  chatChanged: EventEmitter<any> = new EventEmitter<any>();

  titleRegex = new RegExp('<<\s?(.+)\s?>>');

  constructor(private localStorageService: LocalStorageService) {
    this.initializeChats();
  }

  initializeChats() {
    this.savedChatKeys = this.localStorageService.getItem(this.chatKeysKey);

    if (!this.savedChatKeys) {
      this.localStorageService.setItem(this.chatKeysKey, []);
      this.savedChatKeys = [];
    }

    this.savedChatKeys.forEach(chatKey => {
      const chat = this.localStorageService.getItem(chatKey) as Chat;
      const filteredAssistantMessages = chat.messages.filter(message => message.role === 'assistant' && this.titleRegex.test(message.content));
      const match = this.titleRegex.exec(filteredAssistantMessages[filteredAssistantMessages.length - 1].content);

      const chatTitle = match ? match[1] : chatKey;

      this.persistedChatOptions.push({label: chatTitle, value: chatKey});
    });
  }

  selectChat(chatKey: string) {
    if (this.savedChatKeys.includes(chatKey)) {
      this.currentChat = this.localStorageService.getItem(chatKey) as Chat;
      this.chatChanged.emit();
    }
  }

  createNewChat() {
    this.currentChat = new Chat();
  }

  saveNewChatKey() {
    this.savedChatKeys.push(this.currentChat.id);
    this.localStorageService.setItem(this.chatKeysKey, this.savedChatKeys);
    this.persistedChatOptions.push({label: this.currentChat.messages[0]?.content.slice(0, 32) || this.currentChat.id, value: this.currentChat.id})
  }

  saveCurrentChat() {
    this.localStorageService.setItem(this.currentChat.id, this.currentChat);
  }

  clearChatHistory() {
    for (const chatKey of this.savedChatKeys) {
      this.localStorageService.removeItem(chatKey);
    }

    this.savedChatKeys = [];
    this.localStorageService.setItem(this.chatKeysKey, this.savedChatKeys);
    this.persistedChatOptions = [];
    this.currentChat = new Chat();
  }
}
