import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserModel } from '../../interface/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);

  @Input() user: UserModel | null = null;

  isUserModelOpen = false;

  onUserModelToggle() {
    console.log('onUserModelToggle');
    this.isUserModelOpen = !this.isUserModelOpen;
    this.cdr.markForCheck();
  }
  onLogout() {
    this.authService.logout().subscribe();
  }
}
