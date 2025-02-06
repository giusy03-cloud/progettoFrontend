import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamereService {
  private apiUrl = 'http://localhost:8080/api/camere';

  constructor(private http: HttpClient) {}

  getAllCamere(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  resetDisponibilita(requestBody: any): Observable<any> {
    const url = `${this.apiUrl}/resetDisponibilita`;
    return this.http.post<any>(url, requestBody);
  }

}
