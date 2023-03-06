import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Chat from 'src/app/models/Chat';
import Message from 'src/app/models/Message';
import UserChatData from 'src/app/models/UserChatData';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  async registerUser() {
    await this.authService
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .then((res) => {
        Swal.fire({
          title: 'Welcome',
          text: 'You have registered successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        const admin: User = {
          id: '1',
          name: 'Admin',
          lastName: 'Admin',
          email: '',
        };
        const welcomeMessage: Message = {
          id: uuidv4(),
          timestamp: new Date().getTime(),
          message: 'Welcome to the chat',
          sender: admin,
        };
        const welcomeChat: Chat = {
          id: uuidv4(),
          timestamp: new Date().getTime(),
          messages: [welcomeMessage],
          otherUser: admin,
        };
        const user: User = {
          id: res.user.uid,
          name: this.registerForm.value.name,
          lastName: this.registerForm.value.lastName,
          email: this.registerForm.value.email,
        };

        const userChatData: UserChatData = {
          chats: [welcomeChat],
          contacts: [admin],
          user: user,
        };
        this.chatService.registerUser(userChatData, user.id);
        this.router.navigateByUrl('/backend/login');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Swal.fire({
            title: 'Error',
            text: 'User already exists',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        } else if (error.code === 'auth/invalid-email') {
          Swal.fire({
            title: 'Error',
            text: 'Invalid email',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  goToLogin() {
    this.router.navigateByUrl('/backend/login');
  }
}
