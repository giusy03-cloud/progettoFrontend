import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Importa RouterModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{AuthService} from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordVisible: boolean = false;
  loginData = {
    username: '',
    password: ''
  };
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.loading = true;

    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      response => {
        console.log('Login avvenuto con successo:', response);
        const role = sessionStorage.getItem('role')?.toLowerCase();
        const userId = sessionStorage.getItem('userId');

        console.log('Ruolo dell\'utente:', role);  // Verifica il ruolo
        console.log('User ID memorizzato nel sessionStorage:', userId);

        if (role === 'user') {

          console.log('Navigando alla pagina delle camere...');
          this.router.navigate(['/camere']);
        } else if (role === 'admin') {
          // Se è un 'admin', navigo alla pagina delle prenotazioni
          console.log('Navigando alla pagina delle prenotazioni...');
          this.router.navigate(['/admin/users']);
        }

        this.loading = false;
      },
      error => {
        console.error('Errore durante il login:', error);
        alert('Credenziali non valide!');
        this.loading = false;
      }
    );
  }



  goToRegister() {
    this.router.navigate(['/register']);  // Naviga alla pagina di registrazione
  }

}
