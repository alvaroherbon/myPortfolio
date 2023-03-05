import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UUID } from 'bson';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

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
    this.authService.register(
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    const id = await this.authService.register(
      this.registerForm.value.email,
      this.registerForm.value.password
    );
    const user: User = {
      id: id,
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
    };
    this.chatService.registerUser(user, id);
    this.router.navigate(['/backend/login']);
  }
}
