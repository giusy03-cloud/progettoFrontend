import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecensioniComponent } from './admin-recensioni.component';

describe('AdminRecensioniComponent', () => {
  let component: AdminRecensioniComponent;
  let fixture: ComponentFixture<AdminRecensioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecensioniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecensioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
