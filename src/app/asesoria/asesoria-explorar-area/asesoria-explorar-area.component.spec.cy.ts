import { mount } from 'cypress/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AsesoriaExplorarAreaComponent } from './asesoria-explorar-area.component';
import { AsesoriaService } from '../asesoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Component, EventEmitter } from '@angular/core';

describe('AsesoriaExplorarAreaComponent (Component Test)', () => {
  const estudianteId = 1;

  let getAsesoriasStub: sinon.SinonStub;
  let navigateStub: sinon.SinonStub;

  const mockAsesorias = [
    {
      id: 101,
      areaTematica: 'Matemáticas',
      profesorId: 55,
      modalidad: 'Virtual',
      cuposDisponibles: 3
    },
    {
      id: 102,
      areaTematica: 'Lenguaje',
      profesorId: 56,
      modalidad: 'Presencial',
      cuposDisponibles: 0
    }
  ];

  beforeEach(() => {
    getAsesoriasStub = cy.stub();
    navigateStub = cy.stub();
  });

  const mountComponent = () => {
    mount(AsesoriaExplorarAreaComponent, {
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: AsesoriaService, useValue: { getAsesoriasFiltradas: getAsesoriasStub } },
        { provide: Router, useValue: { navigate: navigateStub } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? String(estudianteId) : null
              }
            }
          }
        }
      ]
    });
  };

  it('debería mostrar asesorías al cargar', () => {
    getAsesoriasStub.returns(of(mockAsesorias));
    mountComponent();

    cy.get('.card-title').should('contain', 'Matemáticas');
    cy.get('.card-title').should('contain', 'Lenguaje');
  });

  it('debería filtrar por área temática correctamente', () => {
    getAsesoriasStub.returns(of(mockAsesorias));
    mountComponent();

    cy.get('#areaSelect').select('Matemáticas');
    cy.get('.card-title').should('contain', 'Matemáticas');
    cy.get('.card-title').should('not.contain', 'Lenguaje');
  });

  it('debería mostrar mensaje cuando no hay asesorías disponibles', () => {
    getAsesoriasStub.returns(of([]));
    mountComponent();

    cy.contains('No hay asesorías disponibles con los filtros seleccionados.').should('exist');
  });

  it('debería mostrar el popup al hacer clic en Reservar', () => {
    getAsesoriasStub.returns(of([mockAsesorias[0]]));
    mountComponent();

    cy.get('.btn-success').contains('Reservar').click();
    cy.contains('¿Confirmas que deseas reservar esta asesoría?').should('exist');
  });

  it('debería cancelar el popup al hacer clic en Cancelar', () => {
    getAsesoriasStub.returns(of([mockAsesorias[0]]));
    mountComponent();

    cy.get('.btn-success').contains('Reservar').click();
    cy.get('.btn-outline-danger').contains('Cancelar').click();
    cy.contains('¿Confirmas que deseas reservar esta asesoría?').should('not.exist');
  });

  it('debería navegar al crear reserva al confirmar en el popup', () => {
    getAsesoriasStub.returns(of([mockAsesorias[0]]));
    mountComponent();

    cy.get('.btn-success').contains('Reservar').click();
    cy.get('.popup-container .btn-success').click();

    cy.wrap(navigateStub).should('have.been.calledWith', ['/reserva-create', mockAsesorias[0].id, estudianteId]);
  });
});
