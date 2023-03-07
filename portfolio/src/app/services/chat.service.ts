import { Injectable } from '@angular/core';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import Chat from '../models/Chat';
import Message from '../models/Message';
import User from '../models/User';
import { uuidv4 } from '@firebase/util';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private database: Database) {}

  getMessages(id: any): Message[] {
    const messages: Message[] = new Array();
    const starCountRef = ref(
      this.database,
      '/ChatMessages/' + id + '/messages'
    );
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const message: Message = childSnapshot.val();
        messages.push(message);
      });
    });
    return messages;
  }

  registerUser(user: User, id: String | null) {
    const admin: User = {
      id: '1',
      name: 'admin',
      lastName: 'admin',
      email: '',
      contacts: [],
      chats: [],
    };

    const welcomeMessage: Message = {
      id: uuidv4(),
      message:
        'Welcome to your chat. Select a contact to start a conversation.',
      timestamp: new Date(),
      sender: '1',
    };

    const chat: Chat = {
      name: 'Welcome Chat',
      timestamp: new Date().toLocaleDateString(),
      id: uuidv4(),
      messages: [welcomeMessage.id],
      users: [user.id, admin.id],
    };
    user.chats.push(chat.id);
    set(ref(this.database, 'users/' + id), user);
    set(ref(this.database, 'chats/' + chat.id), chat);
    set(
      ref(
        this.database,
        'ChatMessages/' + chat.id + '/messages/' + welcomeMessage.id
      ),
      welcomeMessage
    );
  }

  sendMessage(id: String, chat: Chat, message: Message) {
    set(
      ref(this.database, 'ChatMessages/' + chat.id + '/messages/' + message.id),
      message
    );
  }
}
