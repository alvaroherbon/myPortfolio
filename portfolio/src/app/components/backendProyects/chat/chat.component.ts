import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Chat from 'src/app/models/Chat';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from '../../../services/auth.service';
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
    this.chatService.createAdmin();
    this.getUserData();
  }

  getUserData() {
    this.getUser();
  }

  async getUser() {
    const uid = this.authService.getUser()?.uid;

    const starCountRef = ref(this.database, '/users/' + uid);
    onValue(starCountRef, (snapshot) => {
      this.user = snapshot.val();
      this.getChats();
    });
  }

  getChats() {
    const uids = this.user.chats;
    this.chats = [];
    uids.forEach((uid) => {
      const starCountRef = ref(this.database, '/chats/' + uid);
      onValue(starCountRef, (snapshot) => {
        this.chats.push(snapshot.val());
        this.getContacts();
      });
    });
  }

  getContacts() {
    const uids = this.user.contacts;
    this.contacts = [];
    uids.forEach((uid) => {
      const starCountRef = ref(this.database, '/users/' + uid);
      onValue(starCountRef, (snapshot) => {
        this.contacts.push(snapshot.val().user);
      });
    });
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    this.messages = [];
    const startRefM = query(
      ref(this.database, '/ChatMessages/' + chat.id + '/messages'),
      orderByChild('timestamp')
    );
    onValue(startRefM, (snapshot) => {
      this.messages = [];
      snapshot.forEach((childSnapshot) => {
        const message: Message = childSnapshot.val();
        this.messages.push(message);
      });
    });
  }

  sendMessage() {
    const message: Message = {
      id: uuidv4(),
      message: this.sendForm.value.messageToSend,
      timestamp:
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      sender: this.user.id,
    };
    this.chatService.sendMessage(this.user.id, this.selectedChat, message);
    this.sendForm.reset();
  }

  createNewChat() {
    console.log('callilng create new chat');
  }
  addNewContact() {
    console.log('callilng add new contact');
  }
  selectContact(user: User) {
    console.log('callilng select contact');
  }
}
