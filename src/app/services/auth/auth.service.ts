import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserModel, UserSignup } from '../../interface/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:3000/api/auth';
  user_ = signal<UserModel | null>(null);

  constructor() {
    this.checkSession();
  }

  login(username: string, password: string) {
    return this.http
      .post<{ user: UserModel }>(
        `${this.apiUrl}/login`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          this.user_.set(response.user);
          this.router.navigate(['/']);
        })
      );
  }

  signup(user: UserSignup) {
    return this.http
      .post<{ user: UserModel }>(`${this.apiUrl}/signup`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.user_.set(response.user);
          this.router.navigate(['/']);
        })
      );
  }

  logout() {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.user_.set(null);
          this.router.navigate(['/login']);
        })
      );
  }

  checkSession() {
    return this.http
      .get<{ user: UserModel | null }>(`${this.apiUrl}/verify`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.user) {
            this.user_.set(response.user);
          } else {
            this.user_.set(null);
          }
        })
      )
    
  }

  static getEmptyUser(): UserSignup {
    return {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    };
  }
}
