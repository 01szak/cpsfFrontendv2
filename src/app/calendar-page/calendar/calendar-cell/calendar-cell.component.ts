import {Component, Input} from '@angular/core';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-calendar-cell',
  imports: [
    MatCard
  ],
  templateUrl: './calendar-cell.component.html',
  standalone: true,
  styleUrl: './calendar-cell.component.css'
})
export class CalendarCellComponent {
@Input() day!: number;
}
