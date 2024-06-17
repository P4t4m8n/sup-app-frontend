import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { WebSocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages = signal<String[]>([]);

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
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
}
