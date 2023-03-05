import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  //User = User
  contacts: User[];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const res = this.authService.getUser();
    console.log('resultado es ', res);
  }
}
