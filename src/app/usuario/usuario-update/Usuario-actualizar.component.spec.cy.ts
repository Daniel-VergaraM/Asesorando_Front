import { mount } from 'cypress/angular';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { UsuarioActualizarComponent } from './usuario-update.component';
import { UsuarioService } from '../usuario.service';
import { UsuarioDetail } from '../usuarioDetail';

describe('UsuarioActualizarComponent (Component Test) con tipo ESTUDIANTE', () => {
  const userId = 110111;
  let usuarioServiceStub: Partial<UsuarioService>;
  let navegarSpy: any;

  beforeEach(() => {
    // 1) Creamos un mock de UsuarioDetail (solo le importa a getUsuarioDetail y actualizarUsuario)
    const mockDetail = new UsuarioDetail({
      id: userId,
      tipo: 'ESTUDIANTE',
      nombre: 'Maria Gomez',
      correo: 'maria.gomez@example.com',
      contrasena: 'pass1234',
      telefono: '3001234567',
      // El resto de campos puede quedarse en undefined/por defecto
      asesoriasCompletadas: []
    });

    // 2) Stub del servicio
    usuarioServiceStub = {
      getUsuarioDetail: () => of(mockDetail),
      actualizarUsuario: () => of(mockDetail)
    };
    cy.spy(usuarioServiceStub, 'actualizarUsuario').as('actualizarSpy');

    // 3) Spy del router
    navegarSpy = cy.spy().as('navegarSpy');

    // 4) Montamos el componente
    mount(UsuarioActualizarComponent, {
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([['id', String(userId)]])
            }
          }
        },
        { provide: Router, useValue: { navigate: navegarSpy } }
      ]
    });
  });

  it('debería mostrar valores iniciales en el formulario', () => {
    cy.get('input[formcontrolname="nombre"]')
      .should('have.value', 'Maria Gomez');
    cy.get('input[formcontrolname="correo"]')
      .should('have.value', 'maria.gomez@example.com');
    cy.get('input[formcontrolname="contrasena"]')
      .should('have.value', 'pass1234');
    cy.get('input[formcontrolname="telefono"]')
      .should('have.value', '3001234567');
  });

  it('debería deshabilitar el botón si el formulario es inválido', () => {
    cy.get('input[formcontrolname="nombre"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('debería llamar a actualizarUsuario y navegar al hacer submit válido', () => {
    // Rellenamos los 4 campos obligatorios
    cy.get('input[formcontrolname="nombre"]')
      .clear().type('Maria Actualizada');
    cy.get('input[formcontrolname="correo"]')
      .clear().type('maria.updated@example.com');
    cy.get('input[formcontrolname="contrasena"]')
      .clear().type('newpass123');
    cy.get('input[formcontrolname="telefono"]')
      .clear().type('3112223344');

    // Ahora el formulario es válido
    cy.get('button[type="submit"]')
      .should('not.be.disabled')
      .click();

    // Verificamos llamadas
    cy.get('@actualizarSpy').should('have.been.called');
    cy.get('@navegarSpy').should(
      'have.been.calledWith',
      ['/estudiante/home', userId]
    );
  });

  it('debería navegar al cancelar', () => {
    cy.get('[data-cy=btn-cancel]').click();
    cy.get('@navegarSpy').should(
      'have.been.calledWith',
      ['/estudiante/home', userId]
    );
  });
});
