import {Component} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


@Component({
  selector: 'app-login-page',
  imports: [
    MatCard,
    FormsModule,
    NgIf,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  signUp: boolean = false;
  changeTemplate(event:boolean) {
    this.signUp = event;
  }
}
