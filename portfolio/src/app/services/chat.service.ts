import { Injectable } from '@angular/core';
import { Database, set, ref, update } from '@angular/fire/database';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private database: Database) {}

  registerUser(user: User, id: String | null) {
    set(ref(this.database, 'users/' + id), user);
  }

  getUserByName(name: string, id: String | null) {
    const res = ref(this.database, 'users/' + id);
    return res;
  }
}
