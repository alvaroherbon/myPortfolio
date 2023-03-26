import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  child,
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
  addContactForm: FormGroup;
  selectedChat: Chat;
  usersList: User[];
  searchContactList: User[];
  newChatForm: FormGroup;
  newChatContactList: User[] = [];
  newChat: Chat;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private database: Database
  ) {
    this.sendForm = new FormGroup({
      messageToSend: new FormControl(''),
    });
    this.addContactForm = new FormGroup({
      contactToAdd: new FormControl(''),
    });
    this.newChatForm = new FormGroup({
      newChatName: new FormControl(''),
      contactToAddToChat: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.chatService.createAdmin();
    this.getUserData();
  }

  async getUserData() {
    await this.getUser();
  }

  getSelectedChat() {
    return this.selectedChat;
  }

  setSelectedChat(chat: Chat) {
    this.selectedChat = chat;
  }

  async getUser() {
    const uid = this.authService.getUser()?.uid;
    const starCountRef = ref(this.database, '/users/' + uid);
    onValue(starCountRef, (snapshot) => {
      this.user = snapshot.val();
      this.getUsersList();
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
      });
    });
    this.getContacts();
  }

  getContacts() {
    const uids = this.user.contacts;
    this.contacts = [];
    uids.forEach(async (uid) => {
      const user: User = (await get(ref(this.database, 'users/' + uid))).val();
      this.contacts.push(user);
    });
  }

  selectChat(chat: Chat) {
    console.log('calling selectChat');
    this.selectedChat = chat;
    // const startRefM = query(
    //   ref(this.database, '/ChatMessages/' + chat.id + '/messages'),
    //   orderByChild('timestamp')
    // );
    // onValue(startRefM, (snapshot) => {
    //   this.messages = [];
    //   snapshot.forEach((childSnapshot) => {
    //     const message: Message = childSnapshot.val();
    //     this.messages.push(message);
    //   });
    // });
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
    this.newChat = {
      id: uuidv4(),
      name: this.newChatForm.value.newChatName,
      users: this.newChatContactList.map((user) => user.id),
      timestamp: new Date().toLocaleDateString(),
    };
    this.newChat.users.push(this.user.id);
    this.chatService.registerNewChat(this.newChat);
    this.newChatForm.reset();
    this.newChatContactList.forEach((user) => {
      user.chats.push(this.newChat.id);
      this.chatService.updateUser(user);
    });
    this.user.chats.push(this.newChat.id);
    this.chatService.updateUser(this.user);
    this.emptyNewChatContactList();
  }
  addNewContact(user: User) {
    this.chatService.addNewContact(this.user, user);
    //this.getContacts();
  }
  selectContact(user: User) {
    console.log('callilng select contact');
  }

  async getUsersList() {
    await this.chatService.getAllContacts().then((users) => {
      this.usersList = users;
    });
  }
  async refreshSearchContactList() {
    this.searchContactList = this.usersList.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(this.addContactForm.value.contactToAdd.toLowerCase()) &&
        this.user.id !== user.id
    );
  }
  async refreshAddContactList() {
    this.searchContactList = this.usersList.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(this.newChatForm.value.contactToAddToChat.toLowerCase()) &&
        this.user.id !== user.id
    );
  }
  addNewContactToChat(user: User) {
    this.newChatContactList.push(user);
    this.searchContactList = this.usersList.filter(
      (contact) =>
        this.newChatContactList.indexOf(contact) === -1 &&
        contact.id !== this.user.id
    );
  }
  removeContactFromChat(user: User) {
    this.newChatContactList = this.newChatContactList.filter(
      (contact) => contact.id !== user.id
    );
    this.searchContactList.push(user);
  }
  emptyNewChatContactList() {
    this.newChatContactList = [];
  }
}
