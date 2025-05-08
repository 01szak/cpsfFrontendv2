import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {DataSharingService} from '../service/DataSharingService';
import {Reservation} from '../../interfaces/Reservation';
import {ReservationCardComponent} from '../reservation-card/reservation-card.component';

@Component({
  selector: 'app-reservation-panel',
  imports: [
    MatCard,
    ReservationCardComponent
  ],
  templateUrl: './reservation-panel.component.html',
  standalone: true,
  styleUrl: './reservation-panel.component.css'
})
export class ReservationPanelComponent implements OnInit{
  reservations: Reservation[] = []
constructor(private service:DataSharingService) {}

  ngOnInit(): void {
  this.receiveDataFromCalendarCell()
  }

  receiveDataFromCalendarCell() {
  this.service.data$.subscribe(data => {
    this.reservations = data;
  })

  }

}
