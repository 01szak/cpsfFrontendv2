import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Observable} from 'rxjs';
import {CamperPlace} from '../../interface/CamperPlace';
import {CamperPlaceService} from '../../service/CamperPlaceService';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {DatePickerComponent} from '../date-picker/date-picker.component';
import {ReservationHelper} from '../../service/ReservationHelper';
import {PopupFormService} from '../../service/PopupFormService';

@Component({
  selector: 'app-calendar',
  imports: [
    AsyncPipe,
    MatCard,
    DatePickerComponent,
    NgClass,
  ],
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  weekDays: string[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
  days: (number)[] = [];
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  camperPlaces$: Observable<CamperPlace[]>;
  reservationMap = new Map<string,Set<string>>;

  constructor(
    private camperPlaceService: CamperPlaceService,
    private rHelper: ReservationHelper,
    protected popupFormService: PopupFormService,
    private cdr: ChangeDetectorRef,
  ) {
    this.camperPlaces$ = this.camperPlaceService.getCamperPlaces();
  }

  ngOnInit(): void {
    this.generateDays()

    this.rHelper.reservationMap$.subscribe(rm => {
      this.reservationMap = new Map(rm);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = changes['reservationMap'];
    if (value.currentValue) {

    }
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
  isCheckin(year: number, month: number, day: number, camperPlace: CamperPlace) {
    const reservedDays = this.reservationMap!.get(camperPlace.index.toString());
    if (!reservedDays) {
      return false;
    }
    return !reservedDays.has(new Date(year, month, day - 1).toDateString()) && this.isDayReserved(year, month, day, camperPlace);
  }
  isCheckout(year: number, month: number, day: number, camperPlace: CamperPlace) {
    const reservedDays = this.reservationMap!.get(camperPlace.index.toString());
    if (!reservedDays) {
      return false;
    }
    return !reservedDays.has(new Date(year, month, day + 1).toDateString()) && this.isDayReserved(year, month, day, camperPlace);
  }


  protected readonly Date = Date;
}

