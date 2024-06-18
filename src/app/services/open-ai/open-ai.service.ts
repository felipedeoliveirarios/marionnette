import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) { }

  getResponse(prompt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openai_api_key}`
    });

    const body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}
