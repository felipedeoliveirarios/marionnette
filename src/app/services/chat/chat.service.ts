import {Injectable} from '@angular/core';
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

  constructor(private localStorageService: LocalStorageService) {
    this.initializeChats();
  }

  initializeChats() {
    this.savedChatKeys = this.localStorageService.getItem(this.chatKeysKey);

    if (!this.savedChatKeys) {
      console.log('No chat keys found');
      this.localStorageService.setItem(this.chatKeysKey, []);
      this.savedChatKeys = [];
    }

    this.savedChatKeys.forEach(chatKey => {
      const chat = this.localStorageService.getItem(chatKey) as Chat;
      this.persistedChatOptions.push({label: chat.messages[0]?.content.slice(0, 32) || chatKey, value: chatKey});
    });
  }

  selectChat(chatKey: string) {
    if (this.savedChatKeys.includes(chatKey)) {
      this.currentChat = this.localStorageService.getItem(chatKey) as Chat;
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
