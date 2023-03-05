import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  ngOnInit(): void {}

  loginUser() {
    const { email, password } = this.loginForm.value;
    const res = this.authService
      .login(email, password)
      .then((res) => {
        Swal.fire({
          title: 'Bienvenido',
          text: 'Iniciaste sesión correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigateByUrl('/backend/chat');
      })
      .catch((error) => {
        console.log('el error es ', error.code);
        if (error.code === 'auth/user-not-found') {
          Swal.fire({
            title: 'Error',
            text: 'User not found',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        } else if (
          error.code === 'auth/wrong-passsword' ||
          error.code === 'auth/invalid-email'
        ) {
          Swal.fire({
            title: 'Error',
            text: 'user email or password are incorrect',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
  }
}
