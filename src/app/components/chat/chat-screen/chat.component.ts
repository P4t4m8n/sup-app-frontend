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
  styleUrl: './chat.component.scss',
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

  private destroySubjects$ = new Subject<void>();

  message: MessagesToCreate = this.messageService.getEmptyMessage();

  ngOnInit(): void {
    this.webSocketService.onMessage((message: MessageModel) => {
      const updatedMessages = [...this.chat!.messages, message];
      if (!this.chat) return;
      this.chat = { ...this.chat, messages: updatedMessages };
      this.cdr.detectChanges();
      this.scrollToBottom();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  sendMessage(): void {
    this.message.chatId = this.chat?._id || '';
    this.message.userId = this.user?._id || '';
    this.message.senderUserName = this.user?.username || '';
    this.webSocketService.sendMessage(this.message);
    this.message = this.messageService.getEmptyMessage();
  }

  scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }
  
  ngOnDestroy(): void {
    this.destroySubjects$.next();
    this.destroySubjects$.complete();
  }
}
