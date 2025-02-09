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
  camere: any[] = [];
  numeroElementiCarrello: number = 0;

  selectedCameraId: number | null = null;
  commento: string = '';
  userId: number = 1;

  constructor(
    private camereService: CamereService,
    private router: Router,
    private authService: AuthService,
    private recensioneService: RecensioneService,
    private prenotazioniService: PrenotazioneService
  ) {}

  ngOnInit(): void {
    this.loadAllCamere();
    this.updateNumeroElementiCarrello();
  }

  // Carica tutte le camere
  loadAllCamere(): void {
    this.camereService.getAllCamere().subscribe(
      (data) => {
        console.log('Dati ricevuti dal backend:', data);
        this.camere = data;
        this.updateNumeroElementiCarrello();
      },
      (error) => {
        console.error('Errore nel recupero delle camere', error);
      }
    );
  }

  selezionaCamera(cameraId: number): void {
    this.selectedCameraId = cameraId;
    this.commento = '';
  }

  inviaRecensione(): void {
    if (this.commento.trim()) {
      const recensioneData = {
        commento: this.commento,
        nomeUtente: this.authService.getUserName()
      };

      this.recensioneService.addRecensione(recensioneData).subscribe(
        (response) => {
          console.log('Recensione aggiunta:', response);
          alert('Recensione aggiunta con successo');
          this.commento = '';
          this.selectedCameraId = null;
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

          const camera = this.camere.find((c) => c.id === cameraId);
          if (camera) {
            camera.disponibilita = false;
          }

          this.updateNumeroElementiCarrello();
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
        this.numeroElementiCarrello = 0;
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Errore durante il logout', error);
        alert('Errore nel logout');
      }
    });
  }

  resetDisponibilita(cameraId: number, disponibilita: boolean): void {
    const userId = this.authService.getUserId(); // Ottieni l'ID dell'utente autenticato
    if (userId === null) {
      alert('Utente non autenticato!');
      return;
    }
    const request = {
      cameraId,
      disponibilita,
      utenteLoggato: userId
    };

    this.camereService.resetDisponibilita(request).subscribe(
      (response) => {
        console.log(response);
        alert('Disponibilità aggiornata con successo');
        this.loadAllCamere();
      },
      (error) => {
        console.error(error);
        alert('Non puoi modificare la disponibilità di una camera che non hai prenotato!');
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
