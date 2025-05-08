import {Component, Input} from '@angular/core';
import {Reservation} from '../../interfaces/Reservation';
import {MatCard} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reservation-cell',
  imports: [
    MatCard,
    MatCheckbox,
    NgClass,
    FormsModule
  ],
  templateUrl: './reservation-card.component.html',
  standalone: true,
  styleUrl: './reservation-card.component.css'
})
export class ReservationCardComponent {
  @Input() reservation!: Reservation;
  showMore: boolean = false;

  formatData() {
    function translate(month: string) {
      switch (month) {
        case "Jan":
          return month = "Sty";
        case "Feb":
          return month = "Lut";
        case "Mar":
          return month = "Mar";
        case "Apr":
          return month = "Kwi";
        case "May":
          return month = "Maj";
        case "Jun":
          return month = "Cze";
        case "Jul":
          return month = "Lip";
        case "Aug":
          return month = "Sie";
        case "Sep":
          return month = "Wrz";
        case "Oct":
          return month = "Paź";
        case "Nov":
          return month = "Lis";
        case "Dec":
          return month = "Gru";
        default:
          return month;
      }
    }

    const formattedDate = (date: Date) => {
      const dateStr = date.toDateString();
      const dateParts = dateStr.split(" ");
      const month = dateParts[1];
      const day = dateParts[2];
      const translatedMonth = translate(month);
      return day + " " + translatedMonth;
    }
    const formattedCheckin = formattedDate(this.reservation.checkin);
    const formattedCheckout = formattedDate(this.reservation.checkout);

    return "od: " + formattedCheckin + " / " + "do: " + formattedCheckout;
  }

}
