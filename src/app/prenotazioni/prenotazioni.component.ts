import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PrenotazioneService } from '../prenotazione.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CamereService } from '../camere.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {
  prenotazione = {
    userId: 1, // ID dell'utente
    cameraId: 0, // ID della camera
    nomeUtente: '' // Nome dell'utente
  };

  camere: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private prenotazioneService: PrenotazioneService,
    private cameraService: CamereService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPrenotazioni(); // Carica tutte le prenotazioni
  }

  // Carica le prenotazioni
  loadPrenotazioni(): void {
    this.prenotazioneService.getAllPrenotazioni().subscribe(
      (data) => {
        console.log('Prenotazioni ricevute dal backend:', data);
        this.camere = data;
      },
      (error) => {
        this.errorMessage = 'Errore nel recuperare le prenotazioni';
      }
    );
  }

  /*

  prenotaCamera(cameraId: number, userId: number, nomeUtente: string): void {
    // Effettua la prenotazione della camera
    this.prenotazioneService.prenotaCamera(cameraId, userId, nomeUtente).subscribe(
      (response) => {
        console.log(response);  // Risposta della prenotazione

        // Se la prenotazione è avvenuta con successo, aggiorna la disponibilità della camera
        if (response && response.success) {
          // Creiamo un oggetto con i parametri necessari per resetDisponibilita
          const requestBody = {
            cameraId: cameraId,    // ID della camera
            disponibilita: false   // Impostiamo la disponibilità a false
          };

          // Passiamo l'oggetto requestBody al metodo resetDisponibilita
          this.cameraService.resetDisponibilita(requestBody).subscribe(
            (disponibilitaResponse) => {
              console.log(disponibilitaResponse);  // Risposta aggiornata della disponibilità
            },
            (error) => {
              console.error(error);  // Errore nell'aggiornamento della disponibilità
            }
          );
        }
      },
      (error) => {
        console.error(error);  // Errore durante la prenotazione
      }
    );


  }

   */



}
