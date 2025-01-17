import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject, from, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ChatDTo } from '../models/chat';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SignalRChatService {
 

 socketUrl ='http://addllmgb.azurewebsites.net/chat';
 

  private socket$!: WebSocketSubject<any>;

  constructor() {
      this.connect();
  }

  private connect(): void {
      // Open WebSocket connection
this.socket$ = webSocket(this.socketUrl);
console.log('this.socket$ connect => ',this.socket$);

  }

  public sendMessage(message: any): void {
    debugger
      this.socket$.next(message);
  }

  public onMessage(): Observable<any> {
    debugger
      return this.socket$.asObservable();
  }

  public disconnect(): void {
      this.socket$.complete();
  }



}
