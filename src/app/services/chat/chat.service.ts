import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ChatModel } from '../../interface/chat';
import { catchError, from, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);

  chats_ = signal<ChatModel[]>([]);

  private apiUrl = 'http://localhost:3000/api/chat';

  constructor() {}

  query(userId: string) {
    return from(this.http.get<ChatModel[]>(`${this.apiUrl}/${userId}`)).pipe(
      tap((chats) => {
        this.chats_.set(chats);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  private _handleError(err: HttpErrorResponse) {
    return throwError(() => err);
  }
}
