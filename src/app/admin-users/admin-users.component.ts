import {Component, OnInit} from '@angular/core';
import{UserService} from '../user.service';
import{CommonModule} from '@angular/common';
import{RouterModule} from '@angular/router';
import{RouterLink} from '@angular/router';
import{AuthService} from '../auth.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit{

  users: any[] = [];

  constructor(private userService: UserService,private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }
  // Metodo per il logout
  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout effettuato con successo');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Errore durante il logout', err);
      }
    });
  }
}
