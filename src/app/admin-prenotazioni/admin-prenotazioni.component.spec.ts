import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrenotazioniComponent } from './admin-prenotazioni.component';

describe('AdminPrenotazioniComponent', () => {
  let component: AdminPrenotazioniComponent;
  let fixture: ComponentFixture<AdminPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPrenotazioniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
