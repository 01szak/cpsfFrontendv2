import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPanelComponent } from './reservation-panel.component';

describe('ReservationPanelComponent', () => {
  let component: ReservationPanelComponent;
  let fixture: ComponentFixture<ReservationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
