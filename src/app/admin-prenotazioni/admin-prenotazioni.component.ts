import { Component } from '@angular/core';
import{CommonModule} from '@angular/common';
import{RouterModule} from '@angular/router';
import{RouterLink} from '@angular/router';
import{PrenotazioneService} from '../prenotazione.service';
import {AuthService} from '../auth.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-admin-prenotazioni',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-prenotazioni.component.html',
  styleUrl: './admin-prenotazioni.component.css'
})
export class AdminPrenotazioniComponent {

  prenotazioni: any[] = [];  // Array per contenere le prenotazioni

  constructor(private prenotazioneService: PrenotazioneService,private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    this.loadPrenotazioni();  // Carica le prenotazioni quando il componente è inizializzato
  }


  loadPrenotazioni(): void {
    this.prenotazioneService.getAllPrenotazioni().subscribe({
      next: (data) => {
        this.prenotazioni = data;
        console.log(this.prenotazioni);
      },
      error: (error) => {
        console.error('Errore nel caricamento delle prenotazioni:', error);
        alert('Impossibile caricare le prenotazioni.');
      }
    });
  }


  deletePrenotazione(prenotazioneId: number): void {
    if (confirm('Sei sicuro di voler eliminare questa prenotazione?')) {
      this.prenotazioneService.deletePrenotazione(prenotazioneId).subscribe(() => {
        this.loadPrenotazioni();  // Ricarica la lista dopo l'eliminazione
      });
    }
  }


  logout(): void {
    console.log("Logout chiamato");  // Verifica che il metodo venga chiamato
    this.authService.logout().subscribe({
      next: (response) => {
        console.log("Logout riuscito", response);  // Log di conferma
        this.router.navigate(['/login']).then(() => {
          window.location.reload();  // Forza il refresh per evitare problemi di cache
        });
      },
      error: (error) => {
        console.error("Errore durante il logout", error);
        alert("Errore nel logout");
      }
    });
  }


}
