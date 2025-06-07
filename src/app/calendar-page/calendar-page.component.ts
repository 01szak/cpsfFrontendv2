import {Component, ViewChild, } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {CalendarComponent} from './calendar/calendar.component';
import {ReservationPanelComponent} from './reservation-panel/reservation-panel.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-calendar-page',
  imports: [
    CalendarComponent,
    ReservationPanelComponent,
    DatePickerComponent,
    NgClass
  ],
  templateUrl: './calendar-page.component.html',
  standalone: true,
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {
@ViewChild(ReservationPanelComponent, {static: false}) panelRef?: ReservationPanelComponent;

   month: number = new Date().getMonth();
   year: number = new Date().getFullYear();

  ngAfterViewChecked() {
    this.isPanelVisible;
  }

  changeMonth(event:number) {
    this.month = event;
  }
  changeYear(event:number) {
    this.year = event;
  }


  get isPanelVisible(): boolean {
    return !!this.panelRef;
  }

}
