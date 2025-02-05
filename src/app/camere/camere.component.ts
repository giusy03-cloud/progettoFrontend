import { Component, OnInit } from '@angular/core';
import { CamereService } from '../camere.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RecensioneService } from '../recensioni.service'; // Aggiungi il servizio recensioni
import { FormsModule } from '@angular/forms';
import { PrenotazioneService } from '../prenotazione.service';

@Component({
  selector: 'app-camere',
  templateUrl: './camere.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./camere.component.css']
})
export class CamereComponent implements OnInit {
  camere: any[] = []; // Array per contenere le camere
  numeroElementiCarrello: number = 0;

  selectedCameraId: number | null = null; // Camera selezionata per recensione
  commento: string = ''; // Commento della recensione
  userId: number = 1; // Supponiamo che l'utente abbia ID 1 (modifica in base all'autenticazione)

  constructor(
    private camereService: CamereService,
    private router: Router,
    private authService: AuthService,
    private recensioneService: RecensioneService, // Aggiungi RecensioneService
    private prenotazioniService: PrenotazioneService
  ) {}

  ngOnInit(): void {
    this.loadAllCamere();  // Carica tutte le camere all'inizio
    this.updateNumeroElementiCarrello();
  }

  // Carica tutte le camere
  loadAllCamere(): void {
    this.camereService.getAllCamere().subscribe(
      (data) => {
        console.log('Dati ricevuti dal backend:', data); // LOG DI DEBUG
        this.camere = data;
        this.updateNumeroElementiCarrello();
      },
      (error) => {
        console.error('Errore nel recupero delle camere', error);
      }
    );
  }

  // Funzione per selezionare la camera per recensione
  selezionaCamera(cameraId: number): void {
    this.selectedCameraId = cameraId; // Imposta la camera selezionata per la recensione
    this.commento = ''; // Resetta il commento precedente (se ce n'era uno)
  }

  inviaRecensione(): void {
    if (this.commento.trim()) {
      const recensioneData = {
        commento: this.commento,
        nomeUtente: this.authService.getUserName()  // Usa il nome utente
      };

      this.recensioneService.addRecensione(recensioneData).subscribe(
        (response) => {
          console.log('Recensione aggiunta:', response);
          alert('Recensione aggiunta con successo');
          this.commento = ''; // Resetta il commento
          this.selectedCameraId = null; // Rimuove la selezione della camera
        },
        (error) => {
          console.error('Errore nell\'aggiunta della recensione', error);
          alert('Si è verificato un errore nell\'aggiunta della recensione');
        }
      );
    } else {
      alert('Inserisci un commento prima di inviare.');
    }
  }


  // Funzione per prenotare la camera
  prenotaCamera(cameraId: number): void {
    const userId = this.authService.getUserId();
    const nomeUtente = this.authService.getUserName();
    if (userId !== null) {
      this.prenotazioniService.prenotaCamera(cameraId, userId, nomeUtente).subscribe(
        (response) => {
          console.log(response);
          alert('Camera prenotata con successo');

          // Dopo la prenotazione, aggiorna la disponibilità della camera localmente
          const camera = this.camere.find((c) => c.id === cameraId);
          if (camera) {
            camera.disponibilita = false; // Rende la camera non disponibile
          }

          this.updateNumeroElementiCarrello();  // Ricalcola il numero di camere prenotate
        },
        (error) => {
          console.error(error);
          alert('Errore nella prenotazione');
        }
      );
    } else {
      alert('Utente non autenticato');
    }
  }

  // Gestisce il logout
  logout() {
    console.log('Logout chiamato');
    this.authService.logout().subscribe({
      next: (response) => {
        console.log(response);
        this.numeroElementiCarrello = 0;  // Reset del numero di elementi nel carrello
        this.router.navigate(['/login']).then(() => {
          window.location.reload(); // Forza il refresh per evitare problemi di cache
        });
      },
      error: (error) => {
        console.error('Errore durante il logout', error);
        alert('Errore nel logout');
      }
    });
  }

  resetDisponibilita(cameraId: number, disponibilita: boolean): void {
    const requestBody = { cameraId, disponibilita }; // Crea l'oggetto con i parametri
    this.camereService.resetDisponibilita(requestBody).subscribe(
      (response) => {
        console.log(response);
        alert('Disponibilità della camera aggiornata con successo');
        this.loadAllCamere(); // Ricarica le camere per aggiornare la lista
        this.updateNumeroElementiCarrello(); // Ricalcola il numero di elementi nel carrello
      },
      (error) => {
        console.error('Errore nel reset delle camere', error);
        alert('Errore nel ripristino delle camere');
      }
    );
  }

  // Aggiorna il numero di elementi nel carrello
  updateNumeroElementiCarrello(): void {
    let camerePrenotate = this.camere.filter((camera) => !camera.disponibilita);
    this.numeroElementiCarrello = camerePrenotate.length;
    console.log('Numero di camere nel carrello:', this.numeroElementiCarrello);
  }
}
