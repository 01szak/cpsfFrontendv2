import {User} from './User';

export  interface Reservation {
  checkin: string;
  checkout: string;
  user: User
  camperPlaceIndex: string;
  price: number;
  isPaid: boolean;
 }
