import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  getUser() {
    return this.auth.currentUser;
  }

  async register(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      ).then((result) => {
        return result.user.uid;
      });

      return result;
    } catch (error) {
      return null;
    }
  }
  login(email: string, password: string) {
    try {
      signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
