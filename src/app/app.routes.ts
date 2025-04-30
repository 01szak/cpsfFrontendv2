import { Routes } from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';

export const routes: Routes = [
  {path: 'login',component: LoginPageComponent},
  {path: 'calendar',component: CalendarPageComponent}
];
