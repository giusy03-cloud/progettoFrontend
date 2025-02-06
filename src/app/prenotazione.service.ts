import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of, tap, throwError} from 'rxjs';

export interface Prenotazione {
  id?: number;
  userId: number;
  cameraId: number;
  nomeUtente?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private apiUrl = 'http://localhost:8080/api/prenotazioni';

  constructor(private http: HttpClient) {}

  // Metodo per prenotare una camera
  prenotaCamera(cameraId: number, userId: number, nomeUtente: string): Observable<any> {
    const url = `${this.apiUrl}/prenota`;
    const body = { userId, cameraId, nomeUtente};
    return this.http.post<any>(url, body);
  }

  getAllPrenotazioni(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.apiUrl).pipe(
      tap(data => console.log('Prenotazioni caricate:', data)),
      catchError((error) => {
        console.error('Errore nel caricamento delle prenotazioni:', error);
        return throwError(() => new Error('Errore nel caricamento delle prenotazioni'));
      })
    );
  }


  // Metodo per eliminare una prenotazione
  deletePrenotazione(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
