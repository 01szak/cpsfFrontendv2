import {Component, OnInit} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {CalendarCellComponent} from './calendar-cell/calendar-cell.component';

@Component({
  selector: 'app-calendar',
  imports: [
    MatTable,
    CalendarCellComponent
  ],
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  days: string[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota","Niedziela" ];
  firstDayOfTheMonth!: number;
  lastDayOfTheMonth!: number;

  ngOnInit(): void {
    this.setFirstRow();
    this.setLastRow();
  }

  setFirstRow() {
    const today = new Date();
    this.firstDayOfTheMonth = new Date(today.setDate(1)).getDay() - 3 ;
    this.firstDayOfTheMonth = this.firstDayOfTheMonth === -1 ? this.firstDayOfTheMonth = 6 : this.firstDayOfTheMonth;
  }
  setLastRow() {
    const today = new Date();
    this.lastDayOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay() - 4 ;
    this.lastDayOfTheMonth = this.lastDayOfTheMonth === -1 ? this.lastDayOfTheMonth = 6 : this.lastDayOfTheMonth;
  }

}
