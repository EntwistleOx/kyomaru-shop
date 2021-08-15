/* eslint-disable cypress/no-unnecessary-waiting */
describe('Cart', () => {
  beforeEach(function () {
    cy.visit('/');
    cy.wait(2000);
    cy.get('.v-toolbar__content > :nth-child(7) > .v-btn__content').click();
    cy.wait(1000);
    cy.get(
      '.v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input',
    ).type('janedoe@maildrop.cc');
    cy.get(':nth-child(2) > .v-input').type('321654987');

    cy.get('.v-card__actions > .text-none > .v-btn__content').click();
  });

  describe('When logged in', () => {
    it('a user can add a product to cart', () => {
      cy.get(
        ':nth-child(2) > .row > :nth-child(1) > a > .v-card > .v-image > .v-responsive__content',
      ).click();

      cy.get('.ml-6 > .v-btn__content').click();

      cy.get('.v-toolbar__content > .v-btn--router').click();

      cy.get('.v-card > .d-flex');
    });

    it('a user can delete a product from cart', () => {
      cy.get(
        ':nth-child(2) > .row > :nth-child(1) > a > .v-card > .v-image > .v-responsive__content',
      ).click();

      cy.get('.ml-6 > .v-btn__content').click();

      cy.get('.v-toolbar__content > .v-btn--router').click();

      cy.get('.ml-auto > .v-btn').click();
      cy.get('.v-alert').contains('El carrito esta vacio.');
    });
  });

  afterEach(function () {
    cy.get('.hidden-sm-and-down.v-btn').click();
    cy.get('.v-menu__content > .v-card > .v-card__actions > .v-btn').click();
  });
});
