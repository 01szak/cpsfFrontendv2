import {Component, Input} from '@angular/core';
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
  months: string[] = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  @Input() month: string = this.months[new Date().getMonth()];
  @Input() year: number = new Date().getFullYear();

  changeMonth(event:string) {
  console.log(event)
    this.month = event;
  }
  changeYear(event:number) {
    console.log(event)
    this.year = event;
  }

}
