import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../interface/Reservation';
import {ReservationMetadata} from '../interface/ReservationMetadata';



@Injectable({providedIn: "root"})
export class ReservationService {

  readonly api = '/api/reservations/'

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api + 'getAll');
  }

  getReservationMetadata(): Observable<Record<string, ReservationMetadata>> {
    return this.http.get<Record<string, ReservationMetadata>> (this.api + 'getReservationMetadata');
  }

  createReservation(reservation: Reservation) {
    return this.http.post<Reservation>(this.api + 'createReservation', reservation).subscribe(() => {
      window.location.reload();
    }
    );
  }

  updateReservation(reservationToUpdate: Reservation){
    return this.http.patch<Reservation>(this.api + 'updateReservation/' + reservationToUpdate.id!.toString(), reservationToUpdate).subscribe(() => {
    window.location.reload();
    });
  }

}
