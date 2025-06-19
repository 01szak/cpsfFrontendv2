import {Guest} from './Guest';
import {CamperPlace} from './CamperPlace';

export  interface Reservation {
  checkin: Date;
  checkout: Date;
  guestFirstName: string;
  guestLastName: string;
  camperPlaceIndex: string;
  price: number;
  isPaid: boolean;
  isChecked: boolean;
  note: string;
 }
