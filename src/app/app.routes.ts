import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import{CamereComponent} from './camere/camere.component';
import{PrenotazioniComponent} from './prenotazioni/prenotazioni.component';
import{AuthGuard} from './auth.guard';
import{AdminUsersComponent} from './admin-users/admin-users.component';
import{AdminRecensioniComponent} from './admin-recensioni/admin-recensioni.component';
import{AdminPrenotazioniComponent} from './admin-prenotazioni/admin-prenotazioni.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chi-siamo', component: ChiSiamoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'camere', component: CamereComponent, canActivate:[AuthGuard]},
  {path:'prenotazioni', component: PrenotazioniComponent, canActivate:[AuthGuard]},
  { path: 'admin/users', component: AdminUsersComponent, canActivate:[AuthGuard]},
  {path:'admin/recensioni', component: AdminRecensioniComponent, canActivate:[AuthGuard]},
  {path:'admin/prenotazioni',component: AdminPrenotazioniComponent, canActivate:[AuthGuard]}
];
