import { Component, Input, OnInit } from '@angular/core';
import { ChatModel } from '../../../interface/chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent implements OnInit {
  @Input() chats!: ChatModel[];
  ngOnInit() {
    console.log('chats:', this.chats);
  }
}
