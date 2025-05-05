import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorListComponent } from './profesor-list.component';
import { ProfesorService } from '../profesor.service';
import { of } from 'rxjs';

describe('AsesoriaListComponent', () => {
  let component: ProfesorListComponent;
  let fixture: ComponentFixture<ProfesorListComponent>;
  let mockService: jasmine.SpyObj<ProfesorService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ProfesorService', ['getProfesores']);
    await TestBed.configureTestingModule({
      declarations: [ProfesorListComponent],
      providers: [
        { provide: ProfesorService, useValue: mockService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorListComponent);
    component = fixture.componentInstance;
    mockService.getProfesores.and.returnValue(of([
      { id: 1, tipo: 'Presencial', nombre: 'Profesor 1', correo: 'profesor1@uniandes.edu.co', contrasena: '1234', telefono: '1234567890', fotoUrl: 'url1', videoUrl: 'video1', formacion: 'Formación Alta', experiencia: 'Experiencia Alta', enlaceReunion: 'enlace1', codigoPostal: 11111, latitud: 4.5, longitud: -74.5, tematicas: [] },
      { id: 1, tipo: 'Virtual', nombre: 'Profesor 2', correo: 'profesor2@uniandes.edu.co', contrasena: '5678', telefono: '0987654321', fotoUrl: 'url2', videoUrl: 'video2', formacion: 'Formación Media', experiencia: 'Experiencia Media', enlaceReunion: 'enlace2', codigoPostal: 55555, latitud: 10.8, longitud: -48.2, tematicas: [] }
    ]));
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
