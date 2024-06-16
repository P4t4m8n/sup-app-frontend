import { Component, OnInit } from '@angular/core';
import {  signal } from '@angular/core';
import { WebSocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
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
