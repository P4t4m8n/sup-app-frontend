import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FriendService } from '../../../services/friend/friend.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatComponent implements OnInit {
  isOpen = true;
  mode: 'addFriend' | 'friendList' = 'friendList';

  friendService = inject(FriendService);
  authService = inject(AuthService);

  user_ = this.authService.user_();
  friendList = this.friendService.friends_;
  
  ngOnInit(): void {
    if (this.user_) {
      this.friendService.query(this.user_._id).subscribe();
    }
    console.log("friendList:", this.friendList)
  }

  onAddFriend(userName: string): void {
    const friend = this.friendService.getEmptyFriend();
    if (!this.user_) return;
    friend.userId = this.user_._id;
    friend.userName = userName;

    this.friendService.create(friend).subscribe();
  }

  toggleMode(mode: 'addFriend' | 'friendList'): void {
    console.log('mode:', mode);
    this.mode = mode;
  }

  toggleModel() {
    this.isOpen = !this.isOpen;
  }
}
