import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('debería mostrar el título en el h1', () => {
    cy.get('h1').should('contain.text', 'Hello, Asesorando');
  });
  it('debería mostrar el título en el h2', () => {
    cy.get('h2').should('contain.text', 'Asesorando');
  });
});
