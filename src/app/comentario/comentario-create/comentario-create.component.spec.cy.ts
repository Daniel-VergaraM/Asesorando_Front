import { mount } from 'cypress/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComentarioCreateComponent } from './comentario-create.component';
import { ComentarioService } from '../comentario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Component } from '@angular/core';

describe('ComentarioCreateComponent (Component Test)', () => {
  const estudianteId = 42;
  const idReserva = 99;

  let createComentarioStub: sinon.SinonStub;
  let navigateStub: sinon.SinonStub;
  let emitSpy: sinon.SinonSpy;

  beforeEach(() => {
    createComentarioStub = cy.stub();
    navigateStub = cy.stub();
  });

  const mountComponent = () => {
    mount(ComentarioCreateComponent, {
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ComentarioService, useValue: { createComentarioYAsociar: createComentarioStub } },
        { provide: Router, useValue: { navigateByUrl: () => Promise.resolve(), navigate: navigateStub } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return String(estudianteId);
                  if (key === 'idReserva') return String(idReserva);
                  return null;
                }
              }
            }
          }
        }
      ]
    }).then((fixture) => {
      // Espiar emisión del evento
      emitSpy = cy.spy(fixture.component.comentarioCreado, 'emit');
    });
  };

  it('se crea correctamente y muestra el formulario con botón deshabilitado', () => {
    mountComponent();

    cy.get('textarea[formControlName=comentario]').should('exist');
    cy.get('input[formControlName=calificacion]').should('exist');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('habilita el botón de Enviar cuando se llenan los campos válidamente', () => {
    mountComponent();

    cy.get('textarea[formControlName=comentario]').type('Muy buena asesoría');
    cy.get('input[formControlName=calificacion]').type('5');

    cy.get('button[type=submit]').should('not.be.disabled');
  });

  it('llama a createComentarioYAsociar y emite el evento si el comentario es válido', () => {
    const comentarioMock = { comentario: 'Excelente', calificacion: 5 };
    createComentarioStub.withArgs(idReserva, comentarioMock).returns(of(comentarioMock));

    mountComponent();

    cy.get('textarea[formControlName=comentario]').type('Excelente');
    cy.get('input[formControlName=calificacion]').type('5');
    cy.get('button[type=submit]').click();

    cy.wrap(createComentarioStub).should('have.been.calledOnceWith', idReserva, comentarioMock);
    cy.wrap(emitSpy).should('have.been.calledOnceWith', comentarioMock);
  });

  it('muestra error en consola si el comentario falla al enviarse', () => {
    const comentarioMock = { comentario: 'Malo', calificacion: 1 };
    const consoleSpy = cy.spy(console, 'error');
    createComentarioStub.withArgs(idReserva, comentarioMock).returns(throwError(() => new Error('Falló')));

    mountComponent();

    cy.get('textarea[formControlName=comentario]').type('Malo');
    cy.get('input[formControlName=calificacion]').type('1');
    cy.get('button[type=submit]').click();

    cy.wrap(createComentarioStub).should('have.been.calledOnceWith', idReserva, comentarioMock);
    cy.wrap(consoleSpy).should('have.been.called');
  });

  it('al presionar "Regresar" navega al home del estudiante', () => {
    mountComponent();

    cy.get('button.btn-outline-secondary').click();

    cy.wrap(navigateStub).should('have.been.calledOnceWith', ['/estudiante/home', estudianteId]);
  });
});
