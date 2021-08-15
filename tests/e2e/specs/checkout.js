/* eslint-disable cypress/no-unnecessary-waiting */
describe('Checkout', () => {
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
    it('a user can checkout', () => {
      cy.get(
        ':nth-child(2) > .row > :nth-child(1) > a > .v-card > .v-image > .v-responsive__content',
      ).click();

      cy.get('.ml-6 > .v-btn__content').click();

      cy.get('.v-toolbar__content > .v-btn--router').click();

      cy.get('.shrink > .text-none').click();

      cy.get(
        '[style="transform-origin: center top 0px;"] > .v-stepper__wrapper > .text-none',
      ).click();

      cy.get(
        ':nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections',
      ).click();

      cy.get('.v-menu__content').contains('Atacama').click();

      cy.get(
        ':nth-child(3) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections',
      ).click();

      cy.get('.v-menu__content').contains('Caldera').click();

      cy.get(
        '[style="transform-origin: center top 0px;"] > .v-stepper__wrapper > .row > :nth-child(4) > .v-input',
      ).type('800600');

      cy.get(
        '[style="transform-origin: center top 0px;"] > .v-stepper__wrapper > .row > .col > .v-input',
      ).type('San Luis 6660');

      cy.get('.v-stepper__wrapper > :nth-child(3)').click();

      cy.get('.mb-1 > .v-card__actions > .text-none').click();
    });
  });

  afterEach(function () {
    cy.get('.hidden-sm-and-down.v-btn').click();
    cy.get('.v-menu__content > .v-card > .v-card__actions > .v-btn').click();
  });
});
