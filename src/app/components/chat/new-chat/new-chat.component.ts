import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FriendService } from '../../../services/friend/friend.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ChatModel } from '../../../interface/chat';
import { ChatService } from '../../../services/chat/chat.service';
import { FriendModel } from '../../../interface/friend';
import { WebSocketService } from '../../../services/socket/socket.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatComponent implements OnInit {
  isOpen = true;
  mode: 'addFriend' | 'friendList' = 'addFriend';
  @Output() selectedChat = new EventEmitter<ChatModel>();

  friendService = inject(FriendService);
  authService = inject(AuthService);
  chatService = inject(ChatService);
  webSocketService = inject(WebSocketService);

  cdr = inject(ChangeDetectorRef);

  user_ = this.authService.user_();
  friendList = this.friendService.friends_;

  ngOnInit(): void {
    if (this.user_) {
      this.friendService.query(this.user_._id).subscribe();
    }
  }

  onAddFriend(userName: string): void {
    const friend = this.friendService.getEmptyFriend();
    if (!this.user_) return;
    friend.userId = this.user_._id;
    friend.userName = userName;

    this.friendService.create(friend).subscribe();
  }

  toggleMode(ev: MouseEvent, mode: 'addFriend' | 'friendList'): void {
    ev.stopImmediatePropagation();
    this.mode = mode;
    this.cdr.markForCheck();
  }

  toggleModel() {
    this.isOpen = !this.isOpen;
  }

  onStartChat(friend: FriendModel): void {
    if (!this.user_) return;
    this.webSocketService.startChat(friend.friendId, (newChat) => {
      this.selectedChat.emit(newChat.chat);
      this.cdr.markForCheck();
    });
  }
}
