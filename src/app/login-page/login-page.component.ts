import {ChangeDetectorRef, Component} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-login-page',
  imports: [

    MatCard,
    MatButton,
    MatInput,
    MatFormField,
    MatLabel,
    FormsModule,
    MatHint,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  signUp: boolean = false;
  user: { login: string, password: string } = {
    login: "test", password: "test"
  };

  login: string = "";
  password: string = "";
  authenticated: boolean = true;

  newUser: { username: string, email: string, password: string, repeatedPassword: string } = {
    username: "",
    email: "",
    password: "",
    repeatedPassword:  ""
  };


  authenticate() {
    if (this.login === this.user.login && this.password === this.user.password) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
  register() {
    let message: {m1:string,m2:string} = {m1: "" , m2: ""}
      if(this.newUser.repeatedPassword !== this.newUser.password) {
        message.m1 = "Hasła nie są tożsame"
      }
      if(this.newUser.username === "") {
        message.m2 = "Nazwa użytkownika nie może być pusta"
      }
     return message
    }
}
