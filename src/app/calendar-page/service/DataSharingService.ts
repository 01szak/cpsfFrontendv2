import {Injectable} from '@angular/core';
import {Reservation} from '../../interfaces/Reservation';
import {Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataSharingService {
 dataSubject = new Subject<Reservation>();
 data$  = this.dataSubject.asObservable();

 sendReservation(reservation: Reservation) {
   this.dataSubject.next(reservation);
 }
}

