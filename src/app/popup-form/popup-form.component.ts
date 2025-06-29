import {Component, inject, Input, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormButtonsComponent} from '../form-buttons/form-buttons.component';


@Component({
  selector: 'app-popup-form',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    FormButtonsComponent,
    MatLabel
  ],
  templateUrl: './popup-form.component.html',
  styleUrl: './popup-form.component.css',
  standalone: true,
})
export class PopupFormComponent implements OnInit{
  readonly popupFormRef = inject(MatDialogRef<PopupFormComponent, FormData>);
  readonly formData = inject<FormData>(MAT_DIALOG_DATA);

  formValues: Record<string, string> = {};
  firstAction = () => this.close();
  secondAction = () => this.submit();


  ngOnInit() {
    for (const input of this.formData.formInputs) {
      const value = input.defaultValue;
      this.formValues[input.field] =
        value instanceof Date ? value.toLocaleDateString('en-CA') : value?.toString() ?? '';
    }
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
  formInputs: FormInput[],
}

export interface FormInput {
  name: string,
  field: string,
  type: string,
  defaultValue?: string | Date | number
  readonly?: boolean
}
