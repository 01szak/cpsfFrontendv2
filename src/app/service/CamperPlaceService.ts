import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../interface/Reservation';
import {CamperPlace} from '../interface/CamperPlace';

@Injectable({providedIn: "root"})
export class CamperPlaceService {

  api = '/api/camperPlace/'

  constructor(private http: HttpClient) {}

  getCamperPlaces(): Observable<CamperPlace[]> {
    return this.http.get<CamperPlace[]>(this.api + 'getAll');
  }
}
