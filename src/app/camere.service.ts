import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamereService {
  private apiUrl = 'http://localhost:8080/api/camere'; // Cambia l'URL a seconda del tuo backend

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutte le camere
  getAllCamere(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  resetDisponibilita(requestBody: any): Observable<any> {
    const url = `${this.apiUrl}/resetDisponibilita`; // URL dell'endpoint nel backend
    return this.http.post<any>(url, requestBody); // Richiesta POST per inviare il corpo con i dati corretti
  }

}
