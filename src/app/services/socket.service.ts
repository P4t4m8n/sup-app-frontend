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
    console.log("message:", message)
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: string) => void) {
    this.socket.on('message', callback);
  }

  // Add more methods as needed
}
