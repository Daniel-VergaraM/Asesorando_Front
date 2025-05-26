
describe('Flujo de login de usuario', () => {
  beforeEach(() => {

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
    // Interceptamos el POST al backend
    cy.intercept('POST', '/api/usuarios/login', {
      statusCode: 200,
      body: {
        id: 'abc123',
        correo: 'juan@uniandes.edu.co',
        tipo: 'ESTUDIANTE_NORMAL',
        nombre: 'Juan'
      }
    }).as('postLogin');

    cy.get('[data-cy=login-email]').type('juan@uniandes.edu.co');
    cy.get('[data-cy=login-password]').type('Pa$$w0rd');
    cy.get('[data-cy=login-submit]').click();

    cy.wait('@postLogin');
    cy.url().should('include', '/estudiante/home/abc123');

    // Verificar localStorage
    cy.window()
      .its('localStorage.userInfo')
      .should('exist')
      .then(raw => {
        const user = JSON.parse(raw);
        expect(user.tipo).to.match(/ESTUDIANTE/);
      });
  });

  it('inicia sesión correctamente y redirige a profesor', () => {
    cy.intercept('POST', '/api/usuarios/login', {
      statusCode: 200,
      body: {
        id: 'prof001',
        correo: 'ana@uniandes.edu.co',
        tipo: 'PROFESOR_TIEMPO_COMPLETO',
        nombre: 'Ana'
      }
    }).as('postLoginProf');

    cy.get('[data-cy=login-email]').type('ana@uniandes.edu.co');
    cy.get('[data-cy=login-password]').type('Secret123');
    cy.get('[data-cy=login-submit]').click();

    cy.wait('@postLoginProf');
    cy.url().should('include', '/profesor/home/prof001');
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
