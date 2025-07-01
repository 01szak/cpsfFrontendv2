import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges, ViewChild
} from '@angular/core';
import {map, Observable} from 'rxjs';
import {CamperPlace} from '../../interface/CamperPlace';
import {CamperPlaceService} from '../../service/CamperPlaceService';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {DatePickerComponent} from '../date-picker/date-picker.component';
import {ReservationHelper} from '../../service/ReservationHelper';
import {PopupFormService} from '../../service/PopupFormService';
import {ReservationService} from '../../service/ReservationService';
import {ReservationMetadata, ReservationMetadataWithSets} from '../../interface/ReservationMetadata';

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
  reservationMetadataWithSets: Record<string, ReservationMetadataWithSets> = {};
  constructor(
    private camperPlaceService: CamperPlaceService,
    protected popupFormService: PopupFormService,
    private reservationService: ReservationService,
    private reservationHelper: ReservationHelper,
  ) {
    this.camperPlaces$ = this.camperPlaceService.getCamperPlaces();
  }

  ngOnInit(): void {
    this.generateDays()
    this.reservationService.getReservationMetadata().subscribe(r => {
      console.log(r)
        this.reservationMetadataWithSets = this.reservationHelper.mapReservationMetadataToSets(r);

    }
    )

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
    const dateStr = this.formatDate(year, month, day);
    return this.reservationMetadataWithSets[camperPlace.index]?.reserved.has(dateStr);
  }

  isCheckin(year: number, month: number, day: number, camperPlace: CamperPlace) {
    const dateStr = this.formatDate(year, month, day);
    return this.reservationMetadataWithSets[camperPlace.index]?.checkin.has(dateStr);
  }

  isCheckout(year: number, month: number, day: number, camperPlace: CamperPlace) {
    const dateStr = this.formatDate(year, month, day);
    return this.reservationMetadataWithSets[camperPlace.index]?.checkout.has(dateStr);
  }

  formatDate(year: number, month: number, day: number): string {
    return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
  }

  openFormPopup(year: number, month: number, day: number, camperPlace: CamperPlace, event: MouseEvent) {
    const  target = event.target as HTMLElement

    if(target.classList.contains('nextToCheckout')) {
       this.popupFormService.openCreateReservationFormPopup(camperPlace, year, month, day);
     } else {
      if (this.isDayReserved(year, month, day, camperPlace)) {
        this.popupFormService.openUpdateReservationFormPopup(camperPlace, year, month, day);
      } else {
        this.popupFormService.openCreateReservationFormPopup(camperPlace, year, month, day);
      }
    }

  }
}

