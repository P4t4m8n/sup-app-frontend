import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ChatModel } from '../../interface/chat';
import { MessageModel } from '../../interface/message';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.websocketUrl, {
      withCredentials: true, 
    });

    this.socket.on('connect', () => {
      console.log(`Connected with id: ${this.socket.id}`);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  startChat(recipientId: string, callback: (data:{chat: ChatModel}) => void) {
    this.socket.emit('startChat', { recipientId });
    this.socket.once('chatStarted', callback);
  }

  onChat(callback: ({ chat }: { chat: ChatModel }) => void) {
    this.socket.on('chatStarted', callback);
  }

  sendMessage(chatId: string, message: string, senderUserName: string) {
    this.socket.emit('sendMessage', { chatId, message, senderUserName });
  }

  onMessage(callback: (message: MessageModel) => void) {
    this.socket.on('message', callback);
  }

  joinRoom(chatId: string) {
    this.socket.emit('joinChat', chatId);
  }

  fetchMessages(chatId: string, callback: (messages: MessageModel[]) => void) {
    this.socket.emit('fetchMessages', { chatId });
    this.socket.once('messages', callback);
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
