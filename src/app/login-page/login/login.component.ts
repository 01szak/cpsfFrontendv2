import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormButtonsComponent} from '../../form-buttons/form-buttons.component';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    FormsModule,
    MatLabel,
    MatHint,
    MatButton,
    MatInput,
    FormButtonsComponent,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: '../login-page.component.css'
})
export class LoginComponent {
  user: { login: string, password: string } = {
    login: "test", password: "test"
  };

  firstAction = () => this.change();
  secondAction = () => this.authenticate();


  login: string = "";
  password: string = "";
  authenticated: boolean = true;
  @Output() changeTemplate = new EventEmitter<boolean>();

  change() {
    this.changeTemplate.emit(true);
  }
  authenticate() {
    if (this.login === this.user.login && this.password === this.user.password) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
}
