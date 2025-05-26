/// <reference types="cypress" />


import { Usuario } from "../../src/app/usuario/usuario";

describe('Flujo de login de usuario', () => {
  beforeEach(() => {
    // 1) Intercepta la llamada al backend para login
    cy.intercept('POST', '/api/usuarios/login').as('postLogin');

    // 2) Visita la página de login
    cy.visit('/login');
  });

  it('muestra el formulario de login correctamente', () => {
    cy.get('[data-cy=login-email]').should('be.visible');
    cy.get('[data-cy=login-password]').should('be.visible');
    cy.get('[data-cy=login-submit]').should('be.disabled');
  });

  it('habilita el botón cuando el formulario es válido', () => {
    cy.get('[data-cy=login-email]').type('juan@uniandes.edu.co');
    cy.get('[data-cy=login-password]').type('Pa$$w0rd');
    cy.get('[data-cy=login-submit]').should('not.be.disabled');
  });

  it('inicia sesión correctamente y redirige a estudiante', () => {
    // Responde con datos de un estudiante
    cy.intercept<Partial<Usuario>>('POST', '/api/usuarios/login', {
      statusCode: 200,
      body: {
        id:  '123',
        correo: 'juan@uniandes.edu.co',
        tipo: 'ESTUDIANTE_NORMAL',
        nombre: 'Juan Pérez'
      }
    }).as('postLoginStudent');

    cy.get('[data-cy=login-email]').type('juan@uniandes.edu.co');
    cy.get('[data-cy=login-password]').type('Pa$$w0rd');
    cy.get('[data-cy=login-submit]').click();

    cy.wait('@postLoginStudent');
    cy.url().should('include', '/estudiante/home/123');

    // Verifica que se haya seteado localStorage.userInfo
    cy.window()
      .its('localStorage.userInfo')
      .should('exist')
      .then(raw => {
        const user = JSON.parse(raw);
        expect(user.tipo).to.match(/ESTUDIANTE/);
        expect(user.correo).to.equal('juan@uniandes.edu.co');
      });
  });

  it('inicia sesión correctamente y redirige a profesor', () => {
    // Responde con datos de un profesor
    cy.intercept<Partial<Usuario>>('POST', '/api/usuarios/login', {
      statusCode: 200,
      body: {
        id: '101',
        correo: 'ana@uniandes.edu.co',
        tipo: 'PROFESOR',
        nombre: 'Ana Gómez'
      }
    }).as('postLoginProf');

    cy.get('[data-cy=login-email]').type('ana@uniandes.edu.co');
    cy.get('[data-cy=login-password]').type('Secret123');
    cy.get('[data-cy=login-submit]').click();

    cy.wait('@postLoginProf');
    cy.url().should('include', '/profesor/home/101');
  });

  it('muestra alerta en credenciales inválidas', () => {
    cy.intercept('POST', '/api/usuarios/login', {
      statusCode: 401,
      body: { message: 'Credenciales inválidas.' }
    }).as('postLoginFail');

    cy.get('[data-cy=login-email]').type('x@y.com');
    cy.get('[data-cy=login-password]').type('wrongpass');
    cy.get('[data-cy=login-submit]').click();

    cy.wait('@postLoginFail');
    cy.on('window:alert', msg => {
      expect(msg).to.equal('Credenciales inválidas.');
    });
  });
});
