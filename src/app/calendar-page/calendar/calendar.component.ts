import {Component, Input, OnInit} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Observable} from 'rxjs';
import {CamperPlace} from '../../interface/CamperPlace';
import {CamperPlaceService} from '../../service/CamperPlaceService';
import {AsyncPipe} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {DatePickerComponent} from '../date-picker/date-picker.component';

@Component({
  selector: 'app-calendar',
  imports: [
    AsyncPipe,
    MatCard,
    DatePickerComponent
  ],
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  weekDays: string[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
  days: (number | null)[] = [];
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  camperPlaces$: Observable<CamperPlace[]>;

  constructor(camperPlaceService: CamperPlaceService) {
    this.camperPlaces$ = camperPlaceService.getCamperPlaces();
  }

  ngOnInit(): void {
    this.generateDays()
  }
  changeMonth(event:number) {
    this.month = event;
    this.generateDays()
  }

  changeYear(event:number) {
    this.year = event;
    this.generateDays()
  }

  generateDays() {
    this.days = []
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push(i);
    }
  }

}

