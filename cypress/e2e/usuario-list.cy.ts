

describe('UsuarioListComponent E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/usuarios', { fixture: 'usuarios' }).as('getUsuarios');
    cy.visit('/usuarios');
    cy.wait('@getUsuarios');
  });

  it('muestra la lista de usuarios', () => {
    cy.get('[data-cy=user-item]').should('have.length', 3);
  });

  it('al hacer click en Ver muestra el detalle', () => {
    cy.intercept('GET', '/api/usuarios/1', { fixture: 'usuario-detail' }).as('getUsuarioDetail');

    cy.get('[data-cy=user-view]').first().click();
    cy.wait('@getUsuarioDetail');

    cy.get('[data-cy=user-detail]')
      .should('be.visible')
      .within(() => {
        cy.contains('Detalle de Juan Pérez').should('exist');
        cy.get('[data-cy=user-advisory]').should('have.length', 2);
      });
  });

  it('cierra el panel de detalle al hacer click en ✕', () => {
    // Abrimos primero
    cy.intercept('GET', '/api/usuarios/1', { fixture: 'usuario-detail.json' });
    cy.get('[data-cy=user-view]').first().click();

    // Luego cerramos
    cy.get('[data-cy=detail-close]').click();
    cy.get('[data-cy=user-detail]').should('not.exist');
  });

  it('navega a la pantalla de edición al hacer click en Actualizar', () => {
    cy.get('[data-cy=user-edit]').first().click();
    cy.url().should('include', '/usuarios/edit/1');
  });
});
