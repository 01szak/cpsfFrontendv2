import {Reservation} from './Reservation';

export interface CamperPlace {
  index: string;
  reservations: Reservation[]
}
