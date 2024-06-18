import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000/');
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: string) => void) {
    this.socket.on('message', callback);
  }

}
