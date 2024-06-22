import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { ChatModel } from '../../../interface/chat';
import { MessageModel } from '../../../interface/message';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrl: './chat-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPreviewComponent implements OnInit {
  @Input() chat!: ChatModel;
  @Input() username = '';
  @Output() selectedChat = new EventEmitter<ChatModel>();
  
  lastMassage: MessageModel | null = null;
  chatWith: string = '';
  
  ngOnInit() {
    console.log('username:', this.username);
    console.log("chat:", this.chat.users[0].username);
    this.chatWith =
      this.chat.users[0].username === this.username
        ? this.chat.users[1].username
        : this.chat.users[0].username;

        console.log('chatWith', this.chatWith);
  }
  
}
