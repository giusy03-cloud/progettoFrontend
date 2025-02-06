import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {Router} from '@angular/router';

interface LoginResponse {
  username: string;
  role: string;
  userId: number;
}

interface LogoutResponse{
  message:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient,private router:Router) {}


  register(username: string, password: string, role: string): Observable<any> {
    const user = { username, password, role };
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }


  login(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user, { withCredentials: true }).pipe(
      tap(response => {
        console.log('Risposta del login:', response);

        if (response && response.username && response.role && response.userId) {
          // Salva le informazioni dell'utente nel sessionStorage
          sessionStorage.setItem('username', response.username);
          sessionStorage.setItem('role', response.role.toLowerCase());
          sessionStorage.setItem('userId', response.userId.toString());
          console.log('Username salvato:', sessionStorage.getItem('username'));
          console.log('Role salvato:', sessionStorage.getItem('role'));
          console.log('User ID salvato:', sessionStorage.getItem('userId'));
        } else {
          console.warn('Il ruolo o userId non sono stati restituiti correttamente dal backend!');
        }
      })
    );
  }

  logout(): Observable<any> {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');

    return this.http.post<LogoutResponse>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap((response) => {
        console.log(response.message);
        sessionStorage.clear();
      })
    );
  }



  // Metodo per verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    const username = sessionStorage.getItem('username');
    console.log('Utente autenticato:', username);  // Aggiungi questo log per vedere se l'utente è autenticato
    return username !== null;
    // Verifica se l'utente è loggato
  }
  // Metodo per ottenere il ruolo dell'utente

  getRole(): string {
    return sessionStorage.getItem('role')?.toLowerCase() || ''; // Ritorna il ruolo o stringa vuota
  }

  getUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    console.log('User ID memorizzato nel sessionStorage:', userId);
    return userId ? parseInt(userId, 10) : null;  // Converte l'ID in numero, se presente
  }

  getUserName(): string {
    // Recupera il nome utente dal sessionStorage
    return sessionStorage.getItem('username') || '';  // Restituisce il nome utente salvato nel sessionStorage
  }




}
