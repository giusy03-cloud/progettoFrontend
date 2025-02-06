import { TestBed } from '@angular/core/testing';
import{RecensioneService} from './recensioni.service';

describe('RecensioniService', () => {
  let service: RecensioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecensioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
