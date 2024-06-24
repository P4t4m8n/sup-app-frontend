import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FriendService } from '../../../services/friend/friend.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ChatModel } from '../../../interface/chat';
import { ChatService } from '../../../services/chat/chat.service';
import { FriendModel } from '../../../interface/friend';
import { WebSocketService } from '../../../services/socket/socket.service';
import { UtilService } from '../../../services/util/util.service';
import { tap } from 'rxjs';
import { UserSmallModel } from '../../../interface/user';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatComponent implements OnInit, OnChanges {
  isOpen = false;
  mode: 'addFriend' | 'friendList' = 'addFriend';
  @Output() selectedChat = new EventEmitter<ChatModel>();

  friendService = inject(FriendService);
  authService = inject(AuthService);
  chatService = inject(ChatService);
  webSocketService = inject(WebSocketService);
  utilService = inject(UtilService);

  cdr = inject(ChangeDetectorRef);

  user_ = this.authService.user_();
  friendList = this.friendService.friends_;

  searchList: UserSmallModel[] = [];

  ngOnInit(): void {
    if (this.user_) {
      this.friendService.query(this.user_._id).subscribe();
    }
  }

  onAddFriend(userSmall: UserSmallModel): void {
    const friend = this.friendService.getEmptyFriend();
    if (!this.user_) return;
    friend.friendId = userSmall._id;
    friend.userId = this.user_._id;
    friend.username = userSmall.username;

    this.friendService.create(friend).subscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes:', changes);
  }

  searchForFriend = this.utilService.debounce((ev: Event) => {
    const { value } = ev.target as HTMLInputElement;
    if (!this.user_) return;
    const list = this.friendService
      .searchForFriends(value)
      .pipe(
        tap((list) => {
          this.searchList = list;
          this.cdr.markForCheck()
        })
      )
      .subscribe();
    console.log('list:', list);
  }, 500);

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
