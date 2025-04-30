import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-reservation-panel',
  imports: [
    MatCard
  ],
  templateUrl: './reservation-panel.component.html',
  standalone: true,
  styleUrl: './reservation-panel.component.css'
})
export class ReservationPanelComponent {

}
