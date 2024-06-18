import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserSignup } from '../../interface/user';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrl: './login-index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginIndexComponent {
  router = inject(Router);
  isLogin = true;
  authService = inject(AuthService);
  user: UserSignup = AuthService.getEmptyUser();

  login(user: UserSignup) {
    this.authService.login(user.username, user.password).subscribe();
  }
  signup(user: UserSignup) {
    this.authService.signup(user).subscribe();
  }

  onBack = () => {
    this.router.navigateByUrl('/pet');
  };

  toggleLogin = () => {
    this.isLogin = !this.isLogin;
  };
}
