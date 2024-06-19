import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Chat, ChatCompletion, Message} from "../../components/chat/chat";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  modelOptions: { label: string, value: string }[] = [
    {value: 'gpt-3.5-turbo', label: 'GPT 3.5 Turbo'},
    {value: 'gpt-4', label: 'GPT 4'},
    {value: 'gpt-4o', label: 'GPT 4o'}
  ];

  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {
  }

  sendChat(messages: Message[], chat: Chat): Observable<ChatCompletion> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openai_api_key}`
    });

    const chatData = JSON.stringify(chat, (key, value) => {
      return (key === 'id') ? undefined : value;
    })

    return this.http.post<ChatCompletion>(this.apiUrl, chatData, {headers: headers});
  }
}
