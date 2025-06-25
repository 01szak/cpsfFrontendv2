import {Component, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  isOpen: boolean = false;

  changeIsOpen() {
    this.isOpen = !this.isOpen;
    this.drawer.toggle();
  }
}
