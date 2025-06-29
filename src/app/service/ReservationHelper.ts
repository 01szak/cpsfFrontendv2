import {map, Observable, shareReplay, take} from 'rxjs';
import {ReservationService} from './ReservationService';
import {Injectable} from '@angular/core';
import {Reservation} from '../interface/Reservation';

@Injectable({providedIn: "root"})
export class ReservationHelper {

  reservations$: Observable<Reservation[]>;
  reservationMap$: Observable<Map<string, Set<string>>>;

  constructor(private reservationService: ReservationService) {
    this.reservations$ = reservationService.getReservations();

    this.reservationMap$ = this.reservations$.pipe(
      take(1),
      map(reservations => {
        const reservationMap = new Map<string, Set<string>>();

        reservations.forEach(r => {
          const key = r.camperPlaceIndex;
          const dates = this.getDatesBetween(this.mapStringToDate(r.checkin), this.mapStringToDate(r.checkout));

          if (!reservationMap.has(key)) {
            reservationMap.set(key, new Set<string>());
          }
          dates.forEach(d => reservationMap.get(key)!.add(d.toDateString()));
        });

        return reservationMap;
      }),
      shareReplay(1)
    );
  }

  getDatesBetween(first: Date, last: Date) {
    let start = new Date(first);
    start.setHours(0, 0, 0, 0);
    let end = new Date(last);
    end.setHours(0, 0, 0, 0);

    let dates: Date[] = [];

    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }

    return dates;
  }
  mapStringToDate(text: string): Date {
    const year: number = Number(text.slice(0,4));
    const month: number = Number(text.slice(5,7));
    const day: number = Number(text.slice(8,10));

    return new Date(year, month - 1, day )
  }

}
