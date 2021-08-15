/* eslint-disable cypress/no-unnecessary-waiting */
describe('Login', () => {
  it('a user cant login with wrong credentials', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('.v-toolbar__content > :nth-child(7) > .v-btn__content').click();

    cy.wait(1000);
    cy.get(
      '.v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input',
    ).type('janedoe@maildrop.cc');
    cy.get(':nth-child(2) > .v-input').type('wrong');

    cy.get('.v-card__actions > .text-none > .v-btn__content').click();

    cy.wait(1000);
    cy.get('.v-snack__content').contains(
      'Ha ocurrido un error, intenta nuevamente.',
    );
  });

  it('a user can login with right credentials', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('.v-toolbar__content > :nth-child(7) > .v-btn__content').click();
    cy.wait(1000);
    cy.get(
      '.v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input',
    ).type('janedoe@maildrop.cc');
    cy.get(':nth-child(2) > .v-input').type('321654987');

    cy.get('.v-card__actions > .text-none > .v-btn__content').click();

    cy.wait(1000);
    cy.get('.v-snack__content').contains('Bienvenido');

    cy.wait(1000);
    cy.get('.hidden-sm-and-down.v-btn').click();
    cy.get('.v-menu__content > .v-card > .v-card__actions > .v-btn').click();
  });
});
