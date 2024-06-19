import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { MessageModel, MessagesToCreate } from '../../interface/message';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000/');
  }

  sendMessage(message: MessagesToCreate) {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: MessageModel) => void) {
    this.socket.on('message', callback);
  }
}
