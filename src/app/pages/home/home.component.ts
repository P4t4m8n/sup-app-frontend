import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ChatService } from '../../services/chat/chat.service';
import { ChatModel } from '../../interface/chat';
import { demoObj } from '../../services/dev.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  chatService = inject(ChatService);

  user_ = this.authService.user_();
  chats_ = this.chatService.chats_;
  selectedChat: ChatModel | null = null;
  username = ''

  ngOnInit(): void {
    if (this.user_) {
      this.chatService.query(this.user_._id).subscribe();
      this.username = this.user_.username
    }
  }

  onSelectChat(chat: ChatModel): void {
    this.selectedChat = chat;
  }
}
