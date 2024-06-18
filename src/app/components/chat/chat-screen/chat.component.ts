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
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatModel } from '../../../interface/chat';
import { ActivatedRoute } from '@angular/router';
import { Subject, map } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = '';
  messages = signal<String[]>([]);

  @Input() chat: ChatModel | null = null;

  private webSocketService = inject(WebSocketService);
  destroySubjects$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    console.log('********************************************');
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
