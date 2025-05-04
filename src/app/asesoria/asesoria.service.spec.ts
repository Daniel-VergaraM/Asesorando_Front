import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AsesoriaService } from './asesoria.service';

describe('AsesoriaService', () => {
  let service: AsesoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AsesoriaService]
    });
    service = TestBed.inject(AsesoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
