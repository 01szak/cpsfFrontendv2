import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CamperPlace} from '../../interface/CamperPlace';
import {CamperPlaceService} from '../../service/CamperPlaceService';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {DatePickerComponent} from '../date-picker/date-picker.component';
import {ReservationHelperService} from '../../service/ReservationHelperService';

@Component({
  selector: 'app-calendar',
  imports: [
    AsyncPipe,
    MatCard,
    DatePickerComponent,
    NgClass
  ],
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  weekDays: string[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
  days: (number)[] = [];
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  camperPlaces$: Observable<CamperPlace[]>;
  reservationMap = new Map<string,Set<string>>
  constructor(
    camperPlaceService: CamperPlaceService,
    private rHelper: ReservationHelperService
  ) {
    this.camperPlaces$ = camperPlaceService.getCamperPlaces();
  }

  ngOnInit(): void {
    this.generateDays()

    this.rHelper.reservationMap$.subscribe(rm => {
      this.reservationMap = rm;
    });

    console.log(this.reservationMap)
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
  isDayReserved(year: number, month: number, day: number, camperPlace: CamperPlace) {
    const reservedDays = this.reservationMap!.get(camperPlace.index.toString());
    if (!reservedDays) {
      return false;
    }
    return reservedDays.has(new Date(year, month, day).toDateString());
  }

}

