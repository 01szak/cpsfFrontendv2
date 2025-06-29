import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {Reservation} from '../interface/Reservation';

@Injectable({providedIn: "root"})
export class ReservationService {

  readonly api = '/api/reservations/'

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api + 'getAll');
  }

  createReservation(reservation: Reservation) {
    return this.http.post<Reservation>(this.api + 'createReservation', reservation).subscribe(() => {
      window.location.reload();
    }
    );
  }
}
