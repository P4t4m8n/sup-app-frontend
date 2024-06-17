import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    authService
      .checkSession()
      .pipe(
        map(() => {
          const isLoggedIn = authService.user_();
          console.log("isLoggedIn:", isLoggedIn)
          if (!isLoggedIn) {
            router.navigate(['/login']);
            observer.next(false);
          } else {
            observer.next(true);
          }
          observer.complete();
        })
      )
      .subscribe();
  });
};
