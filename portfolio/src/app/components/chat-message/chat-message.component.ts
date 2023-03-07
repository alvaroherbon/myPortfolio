import { Component, Input, OnInit } from '@angular/core';
import Chat from 'src/app/models/Chat';
import Message from 'src/app/models/Message';
import User from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  user: User;
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chatService.getUser(this.message.sender).then((user) => {
      this.user = user;
    });
  }

  getTimePosition(): string {
    if (this.message.sender === this.authService.getUser()?.uid) {
      return 'time-right';
    } else {
      return 'time-left';
    }
  }
}
