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
  @Output() selectedChat = new EventEmitter<ChatModel>();

  lastMassage: MessageModel | null = null;

  ngOnInit() {}
}
