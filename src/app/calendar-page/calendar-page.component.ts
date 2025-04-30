import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {CalendarComponent} from './calendar/calendar.component';
import {ReservationPanelComponent} from './reservation-panel/reservation-panel.component';
import {DatePickerComponent} from '../date-picker/date-picker.component';

@Component({
  selector: 'app-calendar-page',
  imports: [
    MatCard,
    CalendarComponent,
    ReservationPanelComponent,
    DatePickerComponent
  ],
  templateUrl: './calendar-page.component.html',
  standalone: true,
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {

}
