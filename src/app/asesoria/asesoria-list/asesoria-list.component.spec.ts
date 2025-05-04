import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsesoriaListComponent } from './asesoria-list.component';
import { AsesoriaService } from '../asesoria.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AsesoriaListComponent', () => {
  let component: AsesoriaListComponent;
  let fixture: ComponentFixture<AsesoriaListComponent>;
  let mockService: jasmine.SpyObj<AsesoriaService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('AsesoriaService', ['getAsesoriasProfesorUltimoAnio']);
    await TestBed.configureTestingModule({
      declarations: [AsesoriaListComponent],
      providers: [
        { provide: AsesoriaService, useValue: mockService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoriaListComponent);
    component = fixture.componentInstance;
    mockService.getAsesoriasProfesorUltimoAnio.and.returnValue(of([
      { id:1, duracion:'1h', tematica:'Álgebra', tipo:'individual', area:'Matemáticas', completada:true, profesorId:42 },
      { id:2, duracion:'30m', tematica:'Física', tipo:'grupo', area:'Ciencias', completada:false, profesorId:42 }
    ]));
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('debe renderizar 2 cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(2);
  });
  it('muestra tematica y tipo en title', () => {
    const title = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(title.textContent).toContain('Álgebra').and.toContain('(individual)');
  });
});
