import { Component, Input, OnInit } from '@angular/core';
import { ChatModel } from '../../../interface/chat';
import { MessageModel } from '../../../interface/message';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrl: './chat-preview.component.scss',
})
export class ChatPreviewComponent implements OnInit {
  @Input() chat!: ChatModel;
  
  lastMassage: MessageModel | null = null;
  
  ngOnInit() {
    console.log("chat:", this.chat)
  }
}
