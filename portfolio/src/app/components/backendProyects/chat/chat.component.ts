import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Chat from 'src/app/models/Chat';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import Message from 'src/app/models/Message';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userName: String;
  userLastName: String;
  chats: Chat[];
  contacts: User[];
  messages: Message[];
  messageToSend: String;
  sendForm: FormGroup;
  selectedChat: Chat;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private database: Database
  ) {
    this.sendForm = new FormGroup({
      messageToSend: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getUser();
    const admin: User = {
      id: '1',
      name: 'admin',
      lastName: 'admin',
      email: '',
      chats: [],
    };

    const welcomMessage: Message = {
      message:
        'Welcome to your chat. Select a contact to start a conversation.',
      timestamp: new Date(),
      sender: admin,
    };

    this.messages = [welcomMessage];
  }

  getUser() {
    const uid = this.authService.getUser()?.uid;
    console.log('la uid es ', uid);
    const starCountRef = ref(this.database, 'users/' + uid);
    onValue(starCountRef, (snapshot) => {
      this.userName = snapshot.val().name;
      this.userLastName = snapshot.val().lastName;
      this.chats = snapshot.val().chats;
    });
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    console.log('selected chat is ', chat.messages);
    this.messages = chat.messages;
  }

  sendMessage() {
    this.sendForm.value.messageToSend;
    this.selectedChat.messages.push({
      message: this.sendForm.value.messageToSend,
      timestamp: new Date(),
      sender: {
        id: this.authService.getUser()?.uid,
        name: this.userName,
        lastName: this.userLastName,
        email: this.authService.getUser()?.email,
        chats: this.chats,
      },
    });
  }
}
