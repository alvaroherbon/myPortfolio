import { Component, Input, OnInit } from '@angular/core';
import Chat from 'src/app/models/Chat';
import Message from 'src/app/models/Message';
import User from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import {
  Database,
  set,
  ref,
  update,
  onValue,
  get,
  orderByChild,
  query,
} from '@angular/fire/database';
import { orderByValue } from 'firebase/database';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.css'],
})
export class ChatMessageListComponent implements OnInit {
  thisChat: Chat;

  @Input()
  set chat(value: Chat) {
    this.messages = [];
    this.thisChat = value;
    this.getMessages();
  }
  messages: Message[];

  getChat() {
    return this.chat;
  }

  constructor(private chatService: ChatService, private database: Database) {}

  messagesUser: { message: Message; user: User }[] = [];

  users: User[];
  ngOnInit(): void {}

  async getMessages() {
    const startRefM = query(
      ref(this.database, 'ChatMessages/' + this.thisChat.id + '/messages'),
      orderByChild('timestamp')
    );
    onValue(startRefM, (snapshot) => {
      this.messages = [];
      snapshot.forEach((childSnapshot) => {
        const message: Message = childSnapshot.val();
        this.messages.push(message);
      });
      this.createList();
    });
  }

  createList() {
    console.log(
      'al llamar a create list, los messages son' + this.messages.length
    );
    this.messagesUser = [];
    this.messages.forEach((message) => {
      this.chatService.getUser(message.sender).then((user) => {
        this.messagesUser.push({ message: message, user: user });
        console.log('el tamaño de messageUesr es ' + this.messagesUser.length);
      });
    });
  }
}
