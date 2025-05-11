import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentarioListComponent } from './comentario-list.component';
import { ComentarioService } from '../comentario.service';
import { of } from 'rxjs';

describe('ComentarioListComponent', () => {
  let component: ComentarioListComponent;
  let fixture: ComponentFixture<ComentarioListComponent>;
  let mockService: jasmine.SpyObj<ComentarioService>;

  beforeEach(async() => {
    mockService = jasmine.createSpyObj('ComentarioService', ['getComentarios']);
    await TestBed.configureTestingModule({
      declarations: [ ComentarioListComponent ],
      providers: [
              { provide: ComentarioService, useValue: mockService }
            ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioListComponent);
    component = fixture.componentInstance;
    mockService.getComentarios.and.returnValue(of([
      { id: 1, comentario: 'Comentario 1', calificacion: 5, profesores: [], asesorias: [], reservas: [] },
      { id: 2, comentario: 'Comentario 2', calificacion: 3, profesores: [], asesorias: [], reservas: [] },
    ]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
