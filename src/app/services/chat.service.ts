import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AddMessageToChatDTO,
  ChatDTo,
  ChatHistoryRequestBodyDTo,
  DeleteChatDTo,
  GetChatHistoryDTo,
} from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  url =
    'https://gbg-dev-cvrankingapi-f7a2b3gtfvcag3a0.uksouth-01.azurewebsites.net/api/';
  urlChatAI = 'https://addllmgb.azurewebsites.net/';
  headers = new HttpHeaders({
    responseType: 'text',
  });

  constructor(private http: HttpClient) {}

  formSubjectChat: BehaviorSubject<any> = new BehaviorSubject(null);
  formSubjectNewChat(value: any) {
    this.formSubjectChat.next(value);
  }

  sessionIdSub: BehaviorSubject<any> = new BehaviorSubject(null);
  sessionIdSubjec(value: any) {
    this.sessionIdSub.next(value);
  }

  resetChatData() {
    this.formSubjectChat.next(null); // You can pass any value you'd like to reset with
  }
  getPatchSourceLookUp() {
    return this.http.get(`${this.url}lookUp/GetPatchSourceLookUp`);
  }

  getListChats(body: ChatHistoryRequestBodyDTo) {
    return this.http.post(`${this.url}Chat/ListChats`, body);
  }

  CreateChatSession(body: any, name: any): Observable<any> {
    return this.http.post(
      `${this.url}Chat/CreateChatSession?Name=${name}`,
      body
    );
  }

  addMessageToChat(body: AddMessageToChatDTO): Observable<any> {
    return this.http.post(`${this.url}Chat/AddMessageToChat`, body);
  }

  postQuestion(body: ChatDTo): Observable<any> {
    return this.http.post(`${this.urlChatAI}chat`, body, {
      responseType: 'text' as 'json',
    });
  }

  deleteChat(body: object): Observable<any> {
    return this.http.post(`${this.urlChatAI}delete`, body);
  }

  deleteChatBackend(id: string | undefined) {
    return this.http.post(`${this.url}Chat/Delete?Id=${id}`, {});
  }

  getChatSession(id: any) {
    return this.http.post(`${this.url}Chat/GetChatSession?Id=${id}`, {});
  }
}
