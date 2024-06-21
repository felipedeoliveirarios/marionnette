import {EventEmitter, Injectable} from '@angular/core';
import {Chat} from "../../components/chat/chat";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatKeysKey = 'CHAT_KEYS'

  currentChat: Chat = new Chat();
  currentChatTitle: string = 'Nova Conversa';
  savedChatKeys: string[] = [];
  persistedChatOptions: { label: string, value: string }[] = [];

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
      if (chat) {
        this.persistedChatOptions.push({label: this.extractChatTitle(chat), value: chatKey});
      }
    });
  }

  selectChat(chatKey: string) {
    if (this.savedChatKeys.includes(chatKey)) {
      this.currentChat = this.localStorageService.getItem(chatKey) as Chat;
      this.currentChatTitle = this.persistedChatOptions.find(option => option.value === chatKey)?.label || 'Sem Título';
      this.chatChanged.emit();
    }
  }

  createNewChat() {
    this.currentChat = new Chat();
    this.currentChatTitle = 'Nova Conversa';
  }

  saveNewChatKey() {
    this.savedChatKeys.push(this.currentChat.id);
    this.localStorageService.setItem(this.chatKeysKey, this.savedChatKeys);
    this.persistedChatOptions.push({
      label: this.extractChatTitle(this.currentChat),
      value: this.currentChat.id
    })
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

    this.createNewChat();
  }

  extractChatTitle(chat: Chat): string {
    const filteredAssistantMessages = chat.messages.filter(message => message.role === 'assistant' && this.titleRegex.test(message.content));
    const match = this.titleRegex.exec(filteredAssistantMessages[filteredAssistantMessages.length - 1].content);

    return match ? match[1] : chat.id;
  }
}
