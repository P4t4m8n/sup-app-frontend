import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, from, retry, tap, throwError } from 'rxjs';
import { FriendModel } from '../../interface/friend';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private http = inject(HttpClient);

  friends_ = signal<FriendModel[]>([]);

  private apiUrl = 'http://localhost:3000/api/friend';

  constructor() {}

  query(userId: string) {
    return from(this.http.get<FriendModel[]>(`${this.apiUrl}/${userId}`)).pipe(
      tap((friends) => {
        console.log("friends:", friends)
        this.friends_.set(friends);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  create(friend: Partial<FriendModel>) {
    console.log('friend:', friend);
    return this.http
      .post<{ friend: FriendModel }>(`${this.apiUrl}/`, { friend })
      .pipe(
        tap((friend) => {
          this.friends_.set([...this.friends_(), friend.friend]);
        }),
        catchError(this._handleError)
      );
  }

  update(friend: FriendModel) {
    return from(
      this.http.put<FriendModel>(`${this.apiUrl}/${friend._id}`, friend)
    ).pipe(
      tap((updatedFriend) => {
        const friends = this.friends_().map((f) =>
          f._id === friend._id ? updatedFriend : f
        );
        this.friends_.set(friends);
      }),
      catchError(this._handleError)
    );
  }

  delete(friend: FriendModel) {
    return from(
      this.http.delete<FriendModel>(`${this.apiUrl}/${friend._id}`)
    ).pipe(
      tap(() => {
        const friends = this.friends_().filter((f) => f._id !== friend._id);
        this.friends_.set(friends);
      }),
      catchError(this._handleError)
    );
  }

  getEmptyFriend(): Partial<FriendModel> {
    return {
      userId: '',
      friendId: '',
      status: 'pending',
      userName: '',
    };
  }

  private _handleError(err: HttpErrorResponse) {
    return throwError(() => err);
  }
}
