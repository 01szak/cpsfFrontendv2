import {Component, ViewChild,} from '@angular/core';
import {CalendarComponent} from './calendar/calendar.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {NgClass} from '@angular/common';
@Component({
  selector: 'app-calendar-page',
  imports: [
    CalendarComponent,
    DatePickerComponent,
    NgClass
  ],
  templateUrl: './calendar-page.component.html',
  standalone: true,
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {
}
