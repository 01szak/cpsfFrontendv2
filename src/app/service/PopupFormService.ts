import {inject, Injectable} from '@angular/core';
import {Reservation} from '../interface/Reservation';
import {FormData, PopupFormComponent} from '../popup-form/popup-form.component';
import {MatDialog} from '@angular/material/dialog';
import {PopupConfirmationService} from './PopupConfirmationService';
import {ReservationService} from './ReservationService';

@Injectable({providedIn: "root"})
export class PopupFormService {
  readonly popupForm: MatDialog = inject(MatDialog);
  constructor(
    private popupConfirmationService: PopupConfirmationService,
    private reservationService: ReservationService
    ) {
  }
  openCreateReservationFormPopup(year?: number, month?: number, day?: number, camperPlaceIndex?: string) {
    const reservation: Reservation = {
      checkin: new Date(year || 0, month || 0, day || 0),
      checkout: new Date(),
      guestFirstName: '',
      guestLastName: '',
      camperPlaceIndex: '',
      price: 0,
      isPaid: false,
    }
    const checkinDefaultDate = (year == undefined || month == undefined || day == undefined) ? undefined : new Date(year, month, day);
    const formData: FormData = {
      header: 'Create Reservation',
      formInputs: [
        { name: 'Checkin', field: 'checkin', type: 'date', defaultValue: checkinDefaultDate, readonly: checkinDefaultDate instanceof Date},
        { name: 'Checkout', field: 'checkout', type: 'date'},
        { name: 'Guest First Name', field: 'guestFirstName', type: 'text'},
        { name: 'Guest Last Name', field: 'guestLastName', type: 'text'},
        { name: 'Camper Place', field: 'camperPlaceIndex', type: 'text', defaultValue: camperPlaceIndex, readonly: typeof camperPlaceIndex === 'string' && camperPlaceIndex.length > 0},
        // { name: 'Is Paid', field: 'isPaid', type: 'checkbox'},
      ]
    };
    const dialogRef = this.popupForm.open(PopupFormComponent, {
      data: formData
    })
    dialogRef.afterOpened().subscribe(() => {
      dialogRef.componentInstance.secondAction = () => {
        const result = dialogRef.componentInstance.formValues;
        console.log(result)
        this.popupConfirmationService.openConfirmationPopup(
          "Rezerwacja zostanie dodana. Czy chcesz kontynuować?",

          () => {
            this.reservationService.createReservation(result);
            dialogRef.close();
          }
        );

      }
    })

  }

}
