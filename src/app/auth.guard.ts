import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Controlla se l'utente è autenticato
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Ottieni il ruolo dell'utente
    const role = this.authService.getRole();
    const requestedRoute = next.url.map(segment => segment.path).join('/'); // Prende il percorso completo


    // ✅ Permetti agli utenti USER di accedere solo a 'camere'
    if (role === 'user' && requestedRoute === 'camere') {
      return true;
    }

    // ✅ Permetti agli ADMIN di accedere a 'prenotazioni' e 'admin/users'
    if (role === 'admin' && (requestedRoute === 'prenotazioni' || requestedRoute === 'admin/users' || requestedRoute==='admin/recensioni' || requestedRoute==='admin/prenotazioni')) {
      return true;
    }

    // ❌ Se il percorso non è consentito, reindirizza alla home
    this.router.navigate(['/home']);
    return false;
  }
}
