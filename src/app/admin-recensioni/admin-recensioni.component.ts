import { Component, OnInit } from '@angular/core';
import { RecensioneService } from '../recensioni.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-recensioni',
  templateUrl: './admin-recensioni.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./admin-recensioni.component.css']
})
export class AdminRecensioniComponent implements OnInit {
  recensioni: any[] = [];
  commento: string = '';

  constructor(
    private recensioneService: RecensioneService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadRecensioni();
  }

  loadRecensioni(): void {
    this.recensioneService.getAllRecensioni().subscribe(
      (data) => {
        this.recensioni = data;
        console.log('Recensioni:', this.recensioni);
      },
      (error) => {
        console.error('Errore nel recupero delle recensioni', error);
        alert('Errore nel recupero delle recensioni');
      }
    );
  }

  addRecensione(): void {
    const nomeUtente = this.authService.getUserName();
    const recensioneData = {
      commento: this.commento,
      nomeUtente: this.authService.getUserName()
    };

    this.recensioneService.addRecensione(recensioneData).subscribe(
      (response) => {
        alert(response.message);
        this.loadRecensioni();
      },
      (error) => {
        console.error('Errore nell\'aggiunta della recensione', error);
        alert('Errore nell\'aggiunta della recensione');
      }
    );
  }


  deleteRecensione(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa recensione?')) {
      this.recensioneService.deleteRecensione(id).subscribe(() => {
        this.loadRecensioni();
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
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
}
