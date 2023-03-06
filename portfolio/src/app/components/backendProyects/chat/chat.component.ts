import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Chat from 'src/app/models/Chat';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import Message from 'src/app/models/Message';
import { FormControl, FormGroup } from '@angular/forms';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  user: User;
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
    };

    const welcomMessage: Message = {
      id: uuidv4(),
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
    const starCountRef = ref(this.database, 'usersChatData/' + uid);
    onValue(starCountRef, (snapshot) => {
      this.user = snapshot.val().user;
      this.chats = snapshot.val().chats;
      this.contacts = snapshot.val().contacts;
    });
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    console.log('selected chat is ', chat.messages);
    this.messages = chat.messages;
  }

  sendMessage() {
    const message: Message = {
      id: uuidv4(),
      message: this.sendForm.value.messageToSend,
      timestamp: new Date().toLocaleDateString(),
      sender: this.user,
    };
    this.selectedChat.messages.push(message);
    this.chatService.sendMessage(this.user.id, this.selectedChat, message);
  }
}
