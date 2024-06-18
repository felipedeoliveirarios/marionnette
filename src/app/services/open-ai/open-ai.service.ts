import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Chat, ChatCompletion, Message} from "../../components/chat/chat";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient){ }

  sendChat(messages: Message[], model: string) : Observable<ChatCompletion> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openai_api_key}`
    });

    const chat = new Chat();
    chat.model = model;
    chat.messages = messages;

    return this.http.post<ChatCompletion>(this.apiUrl, chat, { headers: headers});
  }
}
