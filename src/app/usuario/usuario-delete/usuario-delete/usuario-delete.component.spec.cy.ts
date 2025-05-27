// cypress/component/usuario-delete.cy.ts

/// <reference types="cypress" />

import { mount }               from 'cypress/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError }      from 'rxjs';

import { UsuarioDeleteComponent } from './usuario-delete.component';
import { UsuarioService } from '../../usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

describe('UsuarioDeleteComponent (Component Test)', () => {
  const userId = 99;
  let eliminarStub: sinon.SinonStub;
  let navigateStub: sinon.SinonStub;

  beforeEach(() => {
    eliminarStub = cy.stub();
    navigateStub = cy.stub();
  });

  const mountComponent = () => {
    mount(UsuarioDeleteComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        // Servicio stubeado
        { provide: UsuarioService, useValue: { eliminarusuario: eliminarStub } },
        // Router stubeado
        { provide: Router,         useValue: { navigate: navigateStub } },
        // ActivatedRoute con paramMap simulando +this.route.snapshot.paramMap.get('id')
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => String(userId)
              }
            }
          }
        }
      ],
      componentProperties: { userId }
    });
  };

  it('debe crearse y mostrar el formulario con botón CONFIRMAR deshabilitado', () => {
    mountComponent();

    cy.contains('INGRESAR CONTRASEÑA PARA BORRAR CUENTA').should('exist');
    cy.get('[data-cy=btn-confirm-delete]').should('be.disabled');
  });

  it('habilita el botón CONFIRMAR al ingresar contraseña', () => {
    mountComponent();

    cy.get('[data-cy=input-password]').type('cypressPwd');
    cy.get('[data-cy=btn-confirm-delete]').should('not.be.disabled');
  });

  it('llama a eliminarusuario y navega a root si el borrado es exitoso', () => {
    eliminarStub.withArgs(userId, 'goodpwd').returns(of(void 0));

    mountComponent();

    cy.get('[data-cy=input-password]').type('goodpwd');
    cy.get('[data-cy=btn-confirm-delete]').click();

    cy.wrap(eliminarStub)
      .should('have.been.calledOnceWith', userId, 'goodpwd');
    cy.wrap(navigateStub)
      .should('have.been.calledOnceWith', ['']);
  });

  it('muestra mensaje de error si la contraseña es incorrecta', () => {
  // 1) Preparamos el stub para que arroje error
  eliminarStub.withArgs(userId, 'badpwd').returns(
    throwError(() => ({ status: 401 }))
  );

  // 2) Montamos
  mountComponent();

  // 3) Tecleamos una pwd incorrecta y clic en Confirmar
  cy.get('[data-cy=input-password]').type('badpwd');
  cy.get('[data-cy=btn-confirm-delete]').click();

  // 4) Esperamos un pequeño tick para que Angular detecte el cambio
  cy.wait(0);

  // 5) Ahora sí, comprobamos dentro de .error-message
  cy.get('.error-message')
    .should('be.visible')
    .and('contain.text', 'Contraseña incorrecta o error al borrar.');

  // 6) Y el router nunca debió navegar
  cy.wrap(navigateStub).should('not.have.been.called');
});

  it('al cancelar navega de vuelta al home del profesor', () => {
    mountComponent();

    cy.get('[data-cy=btn-cancel]').click();

    cy.wrap(navigateStub)
      .should('have.been.calledOnceWith', ['/profesor/home', userId]);
  });
});
