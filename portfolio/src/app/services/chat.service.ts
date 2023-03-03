import { Injectable } from '@angular/core';
import { Database, set, ref, update } from '@angular/fire/database';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private database: Database) {}

  registerUser(user: User) {
    set(ref(this.database, 'users/' + user.name + ' - ' + user.id), user);
    console.log('user created successfully');
  }
}
