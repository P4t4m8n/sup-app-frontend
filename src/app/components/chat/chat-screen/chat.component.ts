import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { signal } from '@angular/core';
import { WebSocketService } from '../../../services/socket/socket.service';
import { ChatModel } from '../../../interface/chat';
import { Subject, map } from 'rxjs';
import { UserModel } from '../../../interface/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = '';
  messages = signal<String[]>([]);

  @Input() chat: ChatModel | null =null;
  @Input() user: UserModel | null = null;

  private webSocketService = inject(WebSocketService);
  destroySubjects$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    console.log('chat:', this.chat);
    this.webSocketService.onMessage((message: string) => {
      this.messages.update((messages) => [...messages, message]);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.webSocketService.sendMessage(this.message);
      this.message = '';
    }
  }
  ngOnDestroy(): void {
    this.destroySubjects$.next();
    this.destroySubjects$.complete();
  }
}
