import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserSignup } from '../../../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @Input() user!: UserSignup;
  @Output() login = new EventEmitter<UserSignup>();
  authService = inject(AuthService);

  onLogin() {
    this.login.emit(this.user);
  }
}
