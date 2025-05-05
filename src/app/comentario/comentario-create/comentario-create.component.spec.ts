
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentarioCreateComponent } from './comentario-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComentarioService } from '../comentario.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('ComentarioCreateComponent', () => {
  let component: ComentarioCreateComponent;
  let fixture: ComponentFixture<ComentarioCreateComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ComentarioCreateComponent],
      providers: [ComentarioService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a text area with id texto and formControlName texto', () => {
    const textarea = debug.query(By.css('#texto'));
    expect(textarea).toBeTruthy();
    expect(textarea.attributes['formControlName']).equal('texto');
  });

  it('should have an input with id calificacion and formControlName calificacion', () => {
    const inputCalificacion = debug.query(By.css('#calificacion'));
    expect(inputCalificacion).toBeTruthy();
    expect(inputCalificacion.attributes['formControlName']).equal('calificacion');
  });

  it('should have an input with id idAsesoria and formControlName idAsesoria', () => {
    const inputIdAsesoria = debug.query(By.css('#idAsesoria'));
    expect(inputIdAsesoria).toBeTruthy();
    expect(inputIdAsesoria.attributes['formControlName']).equal('idAsesoria');
  });

  it('should have a submit button with id submit and type submit', () => {
    const submitButton = debug.query(By.css('#submit'));
    expect(submitButton).toBeTruthy();
    expect(submitButton.attributes['type']).equal('submit');
  });
});

