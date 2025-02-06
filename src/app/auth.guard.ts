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
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = this.authService.getRole();
    const requestedRoute = next.url.map(segment => segment.path).join('/'); // Prende il percorso completo

    if (role === 'user' && requestedRoute === 'camere') {
      return true;
    }

    if (role === 'admin' && (requestedRoute === 'prenotazioni' || requestedRoute === 'admin/users' || requestedRoute==='admin/recensioni' || requestedRoute==='admin/prenotazioni')) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
