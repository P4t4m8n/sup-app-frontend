import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { ChatModel } from '../../../interface/chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatListComponent implements OnInit {
  @Input() chats!: ChatModel[];
  @Input() username!: string;
  @Output() selectedChat = new EventEmitter<ChatModel>();
  ngOnInit() {
  }
}
