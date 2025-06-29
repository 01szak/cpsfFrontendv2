import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormButtonsComponent} from '../../form-buttons/form-buttons.component';

@Component({
  selector: 'app-register',
  imports: [
    MatFormField,
    FormsModule,
    MatLabel,
    MatHint,
    MatInput,
    MatButton,
    FormButtonsComponent
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: '../login-page.component.css'
})
export class RegisterComponent {


  newUser: { username: string, email: string, password: string, repeatedPassword: string } = {
    username: "",
    email: "",
    password: "",
    repeatedPassword:  ""
  };

  firstAction = () => this.change();


  @Output() changeTemplate = new EventEmitter<boolean>();
  change() {
    this.changeTemplate.emit(false);
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
