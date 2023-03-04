import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UUID } from 'bson';
import User from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private chatService: ChatService) {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
    });
  }

  ngOnInit() {}

  registerUser() {
    const user: User = {
      id: new UUID().toString(),
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
    };
    this.chatService.registerUser(user);
  }
}
