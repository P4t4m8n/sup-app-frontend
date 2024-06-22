import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ChatModel } from '../../interface/chat';
import { catchError, from, retry, tap, throwError } from 'rxjs';
import { WebSocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  private webSocketService = inject(WebSocketService);

  chats_ = signal<ChatModel[]>([]);

  private apiUrl = 'http://localhost:3000/api/chat';

  constructor() {
    this.webSocketService.onChat(({chat}) => {
      this.chats_.set([...this.chats_(), chat]);
    });
  }

  query(userId: string) {
    return from(this.http.get<ChatModel[]>(`${this.apiUrl}/${userId}`)).pipe(
      tap((chats) => {
        this.chats_.set(chats);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  create(chat: ChatModel) {
    return from(this.http.post<ChatModel>(`${this.apiUrl}/`, chat)).pipe(
      tap((newChat) => {
        // const chat = { ...newChat, messages: [] };
        // this.chats_.set([...this.chats_(), newChat]);
      }),
      catchError(this._handleError)
    );
  }

  getEmptyChat(): ChatModel {
    return {
      users: [],
      name: '',
      messages: [],
    };
  }

  private _handleError(err: HttpErrorResponse) {
    return throwError(() => err);
  }
}
