import {Guest} from './Guest';
import {CamperPlace} from './CamperPlace';

export  interface Reservation {
  checkin: Date;
  checkout: Date;
  guest: Guest;
  camperPlace: CamperPlace;
  price: number;
  isPaid: boolean;
  isChecked: boolean;
  note: string;
 }
