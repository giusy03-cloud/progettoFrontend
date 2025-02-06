import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Corretto per Angular 14+
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import{CamereComponent} from './camere/camere.component';
import { routes } from './app.routes';
import{PrenotazioniComponent} from './prenotazioni/prenotazioni.component';
import{AdminUsersComponent} from './admin-users/admin-users.component';
import{AdminRecensioniComponent} from './admin-recensioni/admin-recensioni.component';
import{AdminPrenotazioniComponent} from './admin-prenotazioni/admin-prenotazioni.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    HomeComponent,
    ChiSiamoComponent,
    LoginComponent,
    RegisterComponent,
    CamereComponent,
    PrenotazioniComponent,
    AdminUsersComponent,
    AdminRecensioniComponent,
    AdminPrenotazioniComponent
  ],

  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Hotel';
  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !['/chi-siamo', '/login', '/register','/camere','/prenotazioni','/admin/users','/admin/recensioni','/admin/prenotazioni'].some(route => event.urlAfterRedirects.startsWith(route));
      }
    });
  }
}
