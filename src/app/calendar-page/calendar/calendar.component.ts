import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class CalendarComponent implements OnInit, OnChanges {
  weekDays: string[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

  days: (number | null)[] = [];
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  ngOnInit(): void {
    this.generateDays()
  }

  ngOnChanges(changes: SimpleChanges) {
   if (changes["month"] || changes["year"]) {
     this.generateDays();
    }
  }

  generateDays() {
    this.days = []
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const formattedFirstDay = firstDay === 0 ? 6 : firstDay - 1
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 0; i < formattedFirstDay; i++) {
      this.days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push(i);
    }
  }
  setDate(day:number) {
    return new Date(this.year, this.month,day);
  }

  protected readonly Array = Array;
  protected readonly Math = Math;
  protected readonly Date = Date;
}

