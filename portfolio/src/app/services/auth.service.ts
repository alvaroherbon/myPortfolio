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

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  login(email: string, password: string) {
    try {
      console.log(
        'el login es ' + signInWithEmailAndPassword(this.auth, email, password)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //TODO continuar aquí
}
