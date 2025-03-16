import { Injectable, inject } from '@angular/core';
import { MessageModel, MessagesToCreate } from '../../interface/message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);

  constructor() {}

  updateStatus(message: MessageModel, status: string) {
    return from(
      this.http.put<MessageModel>(
        `http://localhost:3000/api/messages/${message._id}`,
        { status }
      )
    ).pipe(catchError(this._handleError));
  }

  getEmptyMessage(): MessagesToCreate {
    return {
      message: '',
      userId: '',
      chatId: '',
      senderUserName: '',
      status: 'sent',
    };
  }

  private _handleError(err: HttpErrorResponse) {
    return throwError(() => err);
  }
}
