import {inject, Injectable} from '@angular/core';
import {Reservation} from '../interface/Reservation';
import {FormData, PopupFormComponent} from '../popup-form/popup-form.component';
import {MatDialog} from '@angular/material/dialog';
import {PopupConfirmationService} from './PopupConfirmationService';
import {ReservationService} from './ReservationService';
import {UserService} from './UserService';
import {Observable} from 'rxjs';
import {User} from '../interface/User';
import {CamperPlace} from '../interface/CamperPlace';
import {ReservationHelper} from './ReservationHelper';

@Injectable({providedIn: "root"})
export class PopupFormService {
  readonly popupForm: MatDialog = inject(MatDialog);
  users$: Observable<User[]>;
  constructor(
    private popupConfirmationService: PopupConfirmationService,
    private reservationService: ReservationService,
    private userService: UserService,
    private reservationHelper: ReservationHelper,
    ) {
    this.users$ = this.userService.getUsers()
  }
  openCreateReservationFormPopup(camperPlace: CamperPlace, year?: number, month?: number, day?: number) {
    const checkinDefaultDate = (year === undefined || month === undefined || day === undefined) ? undefined : new Date(year, month, day);
    const formData: FormData = {
      header: 'Nowa rezerwacja',
      formInputs: [
        { name: 'Data wjazdu', field: 'checkin', type: 'date', defaultValue: checkinDefaultDate, readonly: checkinDefaultDate instanceof Date},
        { name: 'Data wyjazdu', field: 'checkout', type: 'date'},
        { name: 'Numer parceli', field: 'camperPlaceIndex', type: 'text', defaultValue: camperPlace.index, readonly: camperPlace.index.length > 0},
        { name: 'Gość', field: 'user', type: 'text', select: true, selectList: this.users$},
        { name: 'Zapłacone', field: 'isPaid', type: 'checkbox', checkbox: true},
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
            const reservationToCreate: Reservation = {
              camperPlaceIndex: result['camperPlaceIndex'].toString(),
              checkin: result['checkin'].toString(),
              checkout: result['checkout'].toString(),
              isPaid: !!result['isPaid'],
              price: 0,
              user: result['user'],
            }

            this.reservationService.createReservation(reservationToCreate);
            dialogRef.close();
          }
        );

      }
    })

  }

  openUpdateReservationFormPopup(camperPlace: CamperPlace, year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    const reservationToUpdate = camperPlace.reservations.find(
        r =>
            this.reservationHelper
              .getDatesBetween(
                this.reservationHelper.mapStringToDate(r.checkin),
                this.reservationHelper.mapStringToDate(r.checkout))
              .some(d => d.getTime() === date.getTime())
    )
    console.log(camperPlace)
    if (!reservationToUpdate) {
      return
    }
    const user: User = reservationToUpdate.user;
    const formData: FormData = {
      header: 'Edycja Rezerwacji',
      formInputs: [
        { name: 'Data wjazdu', field: 'checkin', type: 'date', defaultValue: reservationToUpdate.checkin},
        { name: 'Data wyjazdu', field: 'checkout', type: 'date', defaultValue: reservationToUpdate.checkout},
        { name: 'Numer Parceli', field: 'camperPlace', type: 'text', defaultValue: camperPlace.index},
        { name: 'Gość', field: 'user', type: 'text', defaultValue: reservationToUpdate.user.firstName + " " + reservationToUpdate.user.lastName, readonly: true},
      ]
    }
    const dialogRef = this.popupForm.open(PopupFormComponent, {
      data: formData
    })
    dialogRef.afterOpened().subscribe(() => {
      dialogRef.componentInstance.secondAction = () => {
        const result = dialogRef.componentInstance.formValues;
        result['user'] = user;
        console.log(result)
        this.popupConfirmationService.openConfirmationPopup(
          "Rezerwacja zostanie edytowana. Czy chcesz kontynuować?",
          () => {
            this.reservationService.updateReservation(reservationToUpdate)
          }
        )}
      })
  }
}
