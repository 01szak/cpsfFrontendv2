import {inject, Injectable} from '@angular/core';
import {Reservation} from '../interface/Reservation';
import {FormData, PopupFormComponent} from '../popup-form/popup-form.component';
import {MatDialog} from '@angular/material/dialog';
import {PopupConfirmationService} from './PopupConfirmationService';
import {ReservationService} from './ReservationService';
import {UserService} from './UserService';
import {Observable} from 'rxjs';
import {User} from '../interface/User';

@Injectable({providedIn: "root"})
export class PopupFormService {
  readonly popupForm: MatDialog = inject(MatDialog);
  users$: Observable<User[]>;
  constructor(
    private popupConfirmationService: PopupConfirmationService,
    private reservationService: ReservationService,
    private userService: UserService,
    ) {
    this.users$ = this.userService.getUsers()
  }
  openCreateReservationFormPopup(year?: number, month?: number, day?: number, camperPlaceIndex?: string) {
    const checkinDefaultDate = (year == undefined || month == undefined || day == undefined) ? undefined : new Date(year, month, day);
    const formData: FormData = {
      header: 'Nowa rezerwacja',
      formInputs: [
        { name: 'Data wjazdu', field: 'checkin', type: 'date', defaultValue: checkinDefaultDate, readonly: checkinDefaultDate instanceof Date},
        { name: 'Data wyjazdu', field: 'checkout', type: 'date'},
        { name: 'Numer parceli', field: 'camperPlaceIndex', type: 'text', defaultValue: camperPlaceIndex, readonly: typeof camperPlaceIndex === 'string' && camperPlaceIndex.length > 0},
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
            const userToCreate: User = {
              firstName: result['user'].firstName,
              lastName: result['user'].lastName,
              carRegistration: result['user'].carRegistration,
              streetAddress: result['user'].sreetAdress,
              city: result['user'].city,
              country: result['user'].country,
              email: result['user'].email,
              phoneNumber: result['user'].phoneNumber,


            }
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

}
