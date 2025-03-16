import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { WebSocketService } from '../../../services/socket/socket.service';
import { ChatModel } from '../../../interface/chat';
import { Subject } from 'rxjs';
import { UserModel } from '../../../interface/user';
import { MessageModel, MessagesToCreate } from '../../../interface/message';
import { MessageService } from '../../../services/massage/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy, OnChanges {
  @Input() chat: ChatModel | null = null;
  @Input() user: UserModel | null = null;

  @ViewChild('messagesContainer') private messagesContainer:
    | ElementRef
    | undefined;

  private cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private webSocketService = inject(WebSocketService);

  private destroy$ = new Subject<void>();

  message: MessagesToCreate = this.messageService.getEmptyMessage();

  ngOnInit(): void {
    this.webSocketService.onMessage((message: MessageModel) => {
      if (!this.chat) return;
      if (message.userId !== this.user?._id) message.status = 'read';
      this.chat.messages.push(message);
      this.cdr.markForCheck();
      setTimeout(() => this.scrollToBottom(), 0);
    });

    if (this.chat) {
      this.webSocketService.joinRoom(this.chat._id!);
      this.webSocketService.fetchMessages(this.chat._id!, (messages) => {
        this.chat!.messages = messages;
        this.cdr.markForCheck();
        setTimeout(() => this.scrollToBottom(), 0);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat'] && this.chat) {
      this.webSocketService.joinRoom(this.chat._id!);
      this.webSocketService.fetchMessages(this.chat._id!, (messages) => {
        console.log('messages:', messages);
        this.chat!.messages = messages;
        this.cdr.markForCheck();
        setTimeout(() => this.scrollToBottom(), 0);
      });
    }
  }

  sendMessage(): void {
    if (!this.chat || !this.user) return;
    const newMessage: MessagesToCreate = {
      chatId: this.chat._id!,
      userId: this.user._id,
      message: this.message.message,
      senderUserName: this.user.username,
      status: 'sent',
    };
    this.webSocketService.sendMessage(
      this.chat._id!,
      newMessage.message,
      newMessage.senderUserName
    );
    this.message = this.messageService.getEmptyMessage();
  }

  scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
