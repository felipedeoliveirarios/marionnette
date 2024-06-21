import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Chat, ChatCompletion, Message} from "../../components/chat/chat";
import {Observable} from "rxjs";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  modelOptions: { label: string, value: string }[] = [
    {value: 'gpt-3.5-turbo', label: 'GPT 3.5 Turbo'},
    {value: 'gpt-4', label: 'GPT 4'},
    {value: 'gpt-4o', label: 'GPT 4o'}
  ];

  private _apiKey = '';

  set apiKey(value: string) {
    this._apiKey = value;
    this.localStorageService.setItem('openai-api-key', value);
  }

  systemMessage = 'You are a helpful assistant. Start your answer by generating a title based on the user message send it on the first line between << >> symbols and add a line break after. After that, answer normally, in the same language the user uses.'

  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
    this._apiKey = this.localStorageService.getItem('openai-api-key') || '';
  }

  sendChat(chat: Chat): Observable<ChatCompletion> {
    if (chat.messages.length <= 1) {
      const systemMessage = new Message();
      systemMessage.role = 'system';
      systemMessage.content = this.systemMessage;
      chat.messages.unshift(systemMessage);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._apiKey}`
    });

    const chatData = JSON.stringify(chat, (key, value) => {
      return (Chat.CHAT_IGNORE_FIELDS.includes(key)) ? undefined : value;
    });

    return this.http.post<ChatCompletion>(this.apiUrl, chatData, {headers: headers});
  }

  isKeyPresent() {
    return this._apiKey != '';
  }

  clearKey() {
    this._apiKey = '';
    this.localStorageService.removeItem('openai-api-key');
  }
}
