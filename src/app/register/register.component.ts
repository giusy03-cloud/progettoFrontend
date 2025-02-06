import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import{AuthService} from '../auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {


  passwordVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
  }


  registerData = {
    username: '',
    password: '',
    role: '',
  };

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onRegister() {
    // Chiama il metodo register del servizio
    this.authService.register(
      this.registerData.username,
      this.registerData.password,
      this.registerData.role
    ).subscribe(
      response => {
        console.log('Registrazione avvenuta con successo', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Errore durante la registrazione', error);
      }
    );
  }



}
