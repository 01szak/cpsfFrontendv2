import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {Reservation} from '../interface/Reservation';

@Injectable({providedIn: "root"})
export class ReservationService {

  reservationMap = new Map<string,Set<string>>;
  api = '/api/reservations/'

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api + 'getAll');
  }

  createReservation(result: any) {
      console.log("dodalem rezerwacje")
  }
}
