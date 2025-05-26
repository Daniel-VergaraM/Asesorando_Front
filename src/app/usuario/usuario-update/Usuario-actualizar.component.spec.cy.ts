import { mount } from 'cypress/angular';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { UsuarioActualizarComponent } from './usuario-update.component';
import { UsuarioService } from '../usuario.service';
import { UsuarioDetail } from '../usuarioDetail';

describe('UsuarioActualizarComponent (Component Test)', () => {
  const userId = 42;
  let usuarioServiceStub: Partial<UsuarioService>;
  let navegarSpy: any;

  beforeEach(() => {
    // Preparar mock de UsuarioDetail
    const mockDetail = new UsuarioDetail({
      id: userId,
      tipo: 'PROFESOR_TIEMPO_COMPLETO',
      nombre: 'Profesor Test',
      correo: 'prof@test.com',
      contrasena: 'pass1234',
      telefono: '3001234567',
      fotoUrl: 'https://example.com/foto.jpg',
      videoUrl: 'https://example.com/video.mp4',
      enlaceReunion: 'https://meet.example.com/abc',
      formacion: 'Doctorado en Testing',
      experiencia: '10 años enseñando',
      precioHora: 120,
      codigoPostal: 110111,
      latitud: 4.60,
      longitud: -74.08,
      asesoriasCompletadas: []
    });
    usuarioServiceStub = {
      getUsuarioDetail: () => of(mockDetail),
      actualizarUsuario: (u) => of(mockDetail)
    };

    // Espia actualizarUsuario en el stub
    cy.spy(usuarioServiceStub, 'actualizarUsuario').as('actualizarSpy');
    // espia para Router.navigate
    navegarSpy = cy.spy().as('navegarSpy');

    // trae el componete 
    mount(UsuarioActualizarComponent, {
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', String(userId)]]) } }
        },
        { provide: Router, useValue: { navigate: navegarSpy } }
      ]
    });
  });

  it('debería mostrar valores iniciales en el formulario', () => {
    cy.get('input[formcontrolname="nombre"]').should('have.value', 'Profesor Test');
    cy.get('input[formcontrolname="correo"]').should('have.value', 'prof@test.com');
    cy.get('input[formcontrolname="telefono"]').should('have.value', '3001234567');
    cy.get('input[formcontrolname="precioHora"]').should('have.value', '120');
    cy.get('input[formcontrolname="codigoPostal"]').should('have.value', '110111');
  });

  it('debería deshabilitar el botón si el formulario es inválido', () => {
    cy.get('input[formcontrolname="nombre"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('debería llamar a actualizarUsuario y navegar al submit válido', () => {
    cy.get('input[formcontrolname="nombre"]').clear().type('Profesor Actualizado');
    cy.get('input[formcontrolname="correo"]').clear().type('actualizado@test.com');
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    cy.get('@actualizarSpy').should('have.been.called');
    cy.get('@navegarSpy').should('have.been.calledWith', ['/profesor/home', userId]);
  });

  it('debería navegar al cancelar', () => {
    cy.get('[data-cy=btn-cancel]').click();
    cy.get('@navegarSpy').should('have.been.calledWith', ['/profesor/home', userId]);
  });
});
