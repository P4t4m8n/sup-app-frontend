import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import { ChatModel } from '../../../interface/chat';
import { MessageModel } from '../../../interface/message';
import { WebSocketService } from '../../../services/socket/socket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrl: './chat-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPreviewComponent implements OnInit, OnDestroy {
  @Input() chat!: ChatModel;
  @Input() username = '';
  @Output() selectedChat = new EventEmitter<ChatModel>();

  webSocketService = inject(WebSocketService);
  cdr = inject(ChangeDetectorRef);

  lastMessage: MessageModel | null = null;
  chatWith: { username: string; imgUrl: string } = { username: '', imgUrl: '' };
  private destroy$ = new Subject<void>();

  ngOnInit() {
    console.log(this.chat);
    this.chatWith =
      this.chat.users[0].username === this.username
        ? {
            username: this.chat.users[1].username,
            imgUrl: this.chat.users[1].imgUrl,
          }
        : {
            username: this.chat.users[0].username,
            imgUrl: this.chat.users[0].imgUrl,
          };

    if (this.chat.messages.length > 0) {
      this.lastMessage = this.chat.messages[this.chat.messages.length - 1];
    }

    if (this.chat) {
      this.webSocketService.joinRoom(this.chat._id!);
    }

    this.webSocketService.onMessage((message: MessageModel) => {
      if (message.chatId === this.chat._id) {
        this.lastMessage = message;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
