import { ReactiveFormsModule } from "@angular/forms";
import { ProfesorService } from "../profesor.service";
import { ProfesorDetail } from "../profesorDetail";
import { ProfesorActualizarComponent } from "./profesor-update.component";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { mount } from "cypress/angular";
import { ActivatedRoute, Router } from "@angular/router";

describe('ProfesorActualizarComponent (Component Test)', () => {
  const profesorId = 123;
  let profesorServiceStub: Partial<ProfesorService>;
  let navegarSpy: any;

  beforeEach(() => {
    const mockDetail = new ProfesorDetail(
      profesorId,
      'PROFESOR_TIEMPO_COMPLETO',
      'Nombre Test',
      'test@prof.com',
      'password123',
      '3001234567',
      'https://foto.com/image.jpg',
      'https://video.com/video.mp4',
      'Licenciatura en Educación',
      '5 años de experiencia',
      'https://meet.example.com/abc',
      110111,
      4.6,
      -74.1,
      [], // Tematicas
      []  // Asesorias
    );

    profesorServiceStub = {
      getProfesorDetail: () => of(mockDetail),
      updateProfesor: (p) => of(p)
    };

    cy.spy(profesorServiceStub, 'updateProfesor').as('actualizarSpy');
    navegarSpy = cy.spy().as('navegarSpy');

    mount(ProfesorActualizarComponent, {
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ProfesorService, useValue: profesorServiceStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', String(profesorId)]]) } }
        },
        { provide: Router, useValue: { navigate: navegarSpy } }
      ]
    });
  });

  it('debería mostrar valores iniciales del formulario', () => {
    cy.get('input[formcontrolname="nombre"]').should('have.value', 'Nombre Test');
    cy.get('input[formcontrolname="correo"]').should('have.value', 'test@prof.com');
    cy.get('input[formcontrolname="telefono"]').should('have.value', '3001234567');
    cy.get('input[formcontrolname="codigoPostal"]').should('have.value', '110111');
     
  });

  it('debería deshabilitar el botón si el formulario es inválido', () => {
    
    cy.get('input[formcontrolname="nombre"]').clear().blur();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('debería llamar updateProfesor y navegar al hacer submit válido', () => {
    
    cy.get('input[formcontrolname="precioHora"]').type('50');
    cy.get('textarea[formcontrolname="descripcion"]').type('Descripción generada');
    
    
    cy.get('input[formcontrolname="nombre"]').clear().type('Profesor Actualizado');
    cy.get('input[formcontrolname="correo"]').clear().type('nuevo@prof.com');
    
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    cy.get('@actualizarSpy').should('have.been.called');
    cy.get('@navegarSpy').should('have.been.calledWith', ['/profesor/home', profesorId]);
  });

  it('debería navegar al cancelar', () => {
    cy.get('[data-cy=btn-cancel]').click();
    cy.get('@navegarSpy').should('have.been.calledWith', ['/profesor/home', profesorId]);
  });
});