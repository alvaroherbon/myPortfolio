import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import User from '../models/User';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private chatService: ChatService) {}

  getUser() {
    const name: any = this.auth.currentUser?.email;
    const id: any = this.auth.currentUser?.uid;
    console.log('current user is ', this.auth.currentUser);
    return this.chatService.getUserByName(name, id);
  }

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
}
