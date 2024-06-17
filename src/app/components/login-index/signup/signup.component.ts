import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserSignup } from '../../../interface/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  @Input() user!: UserSignup;
  @Output() signup = new EventEmitter<UserSignup>();

  onSignup() {
    this.signup.emit(this.user);
  }
}
