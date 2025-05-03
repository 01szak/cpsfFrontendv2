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
  weekDays: string[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota","Niedziela" ];
  days:(number | null)[] = [];
  firstDayOfTheMonth!: number;
  lastDayOfTheMonth!: number;
  month: number = 4;
  year:number = 2025;

  ngOnInit(): void {
  this.generateDays()
  }

  generateDays() {
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const formattedFirstDay = firstDay  === 0 ? 6 : firstDay - 1
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 0; i <formattedFirstDay ; i++) {
      this.days.push(null);
    }
    for (let i = 1; i <= daysInMonth ; i++) {
      this.days.push(i);
    }

  }
  // setFirstRow() {
  //   const today = new Date();
  //   this.firstDayOfTheMonth = new Date(today.setDate(1)).getDay() - 3 ;
  //   this.firstDayOfTheMonth = this.firstDayOfTheMonth === -1 ? this.firstDayOfTheMonth = 6 : this.firstDayOfTheMonth;
  // }
  // setCellAmount() {
  //   const today = new Date();
  //   let finalDayOfTheMonth= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay() - 4 ;
  //   for (let i = 1; i <= finalDayOfTheMonth ; i++) {
  //     this.days.push(i);
  //   }
  // }
  // trackWeekDays(day:number) {
  //    const jsDay =   new Date(this.year,this.month,day).getDay();
  //    return jsDay === 0 ? 6 : jsDay - 1;
  // }
  // setLastRow() {
  //   const today = new Date();
  //   this.lastDayOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay() - 4 ;
  //   this.lastDayOfTheMonth = this.lastDayOfTheMonth === -1 ? this.lastDayOfTheMonth = 6 : this.lastDayOfTheMonth;
  // }

  protected readonly Array = Array;
  protected readonly Math = Math;
}
