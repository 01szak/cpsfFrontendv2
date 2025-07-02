import {Component, inject, input, Input, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormButtonsComponent} from '../form-buttons/form-buttons.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {map, Observable, startWith} from 'rxjs';
import {User} from '../interface/User';
import {PopupConfirmationService} from '../service/PopupConfirmationService';
import {ReservationService} from '../service/ReservationService';


@Component({
  selector: 'app-popup-form',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    FormButtonsComponent,
    MatLabel,
    MatCheckbox,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe
  ],
  templateUrl: './popup-form.component.html',
  styleUrl: './popup-form.component.css',
  standalone: true,
})
export class PopupFormComponent implements OnInit{
  readonly popupFormRef = inject(MatDialogRef<PopupFormComponent, FormData>);
  readonly formData = inject<FormData>(MAT_DIALOG_DATA);
  showAdditionalInputs: boolean = true;
  constructor(
    protected popupConfirmationService: PopupConfirmationService,
     protected reservationService: ReservationService
  ) {
  }
  formInputsStandard = this.formData.formInputs.filter(f => !f.additional);
  formInputsAdditional = this.formData.formInputs.filter(f => f.additional);

  formValues: Record<string, any> = {};
  firstAction = () => this.close();
  secondAction = () => this.submit();
  formControl = new FormControl('');
  filteredOptions: Observable<User[]> = new Observable<User[]>();
  userList: User[] = [];

  ngOnInit() {
    for (const input of this.formData.formInputs) {
      const value = input.defaultValue;
      if (input.checkbox === true) {
        this.formValues[input.field] = !!value
      }else if (input.selectList) {
          input.selectList.subscribe(users => {
            this.userList = users;
            this.filteredOptions = this.formControl.valueChanges.pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : this.userDisplay(value || '')),
              map(name => this.filterUsers(name))
            )
          }
          )

      } else {
        this.formValues[input.field] =
          value instanceof Date ? value.toLocaleDateString('en-CA') : value?.toString() ?? '';
      }
    }
  }
  private filterUsers(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.userList.filter(user =>
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(filterValue)
    );
  }

  userDisplay(value: User | string): string {
    if (typeof value === 'string') {
      return value;
    }
    return value ? `${value.firstName} ${value.lastName}` : '';
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent, field: string) {
    this.formValues[field] = event.option.value;
  }

  close() {
    this.popupFormRef.close();
  }
  submit() {
    this.popupFormRef.close(this.formValues);
  }

}
export interface FormData {
  header: string,
  update?: boolean,
  objectToUpdate?: any
  formInputs: FormInput[],
}

export interface FormInput {
  name: string,
  field: string,
  type: string,
  select?: boolean,
  selectList?: Observable<any[]>,
  checkbox?: boolean
  defaultValue?: string | Date | number | User
  readonly?: boolean,
  additional?: boolean
}
