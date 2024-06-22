import { Component, EventEmitter, Output } from '@angular/core';
import { ChatModel } from '../../../interface/chat';

@Component({
  selector: 'app-chat-filter',
  templateUrl: './chat-filter.component.html',
  styleUrl: './chat-filter.component.scss',
})
export class ChatFilterComponent {
  @Output() selectedChat = new EventEmitter<ChatModel>();
  isOpen = false;
}
