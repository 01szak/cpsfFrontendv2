import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../interface/Reservation';

@Injectable({providedIn: "root"})
export  class  ReservationService {

  api = '/api/reservations/'

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api + 'getAll');
  }
}
