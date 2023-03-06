import { Injectable } from '@angular/core';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import Chat from '../models/Chat';
import Message from '../models/Message';
import User from '../models/User';
import UserChatData from '../models/UserChatData';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private database: Database) {}

  registerUser(user: UserChatData, id: String | null) {
    set(ref(this.database, 'usersChatData/' + id), user);
  }

  sendMessage(id: String, chat: Chat, message: Message) {
    update(ref(this.database, 'usersChatData/' + id + '/chats/' + chat.id), {
      messages: chat.messages,
    });
  }
}
