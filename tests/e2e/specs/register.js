/* eslint-disable cypress/no-unnecessary-waiting */
const { uniqueNamesGenerator, names } = require('unique-names-generator');

describe('Register', () => {
  it('a user cant register with already used email', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('.v-toolbar__content > :nth-child(6)').click();

    cy.wait(1000);
    cy.get(
      '.v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input',
    ).type('Jane');
    cy.get(
      '.v-window-item--active > .v-card__text > .container > .row > :nth-child(2) > .v-input',
    ).type('Doe');
    cy.get('.row > :nth-child(3) > .v-input').type('15837344-0');
    cy.get(':nth-child(4) > .v-input').type('56912345678');
    cy.get(':nth-child(5) > .v-input').type('janedoe@maildrop.cc');
    cy.get(':nth-child(6) > .v-input').type('321654987');
    cy.get(':nth-child(7) > .v-input').type('321654987');

    cy.get('.v-card__actions > .text-none > .v-btn__content').click();

    cy.wait(1000);
    cy.get('.v-snack__content').contains(
      'La cuenta de correo ya se encuentra en uso. Intenta con otra.',
    );
  });

  it('a user can register with a new email', () => {
    cy.visit('/');
    cy.wait(2000);
    const randomName = uniqueNamesGenerator({
      dictionaries: [names],
    });

    cy.get('.v-toolbar__content > :nth-child(6)').click();

    cy.wait(1000);
    cy.get(
      '.v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input',
    ).type(randomName);
    cy.get(
      '.v-window-item--active > .v-card__text > .container > .row > :nth-child(2) > .v-input',
    ).type(randomName);
    cy.get('.row > :nth-child(3) > .v-input').type('15837344-0');
    cy.get(':nth-child(4) > .v-input').type('56912345678');
    cy.get(':nth-child(5) > .v-input').type(`${randomName}@maildrop.cc`);
    cy.get(':nth-child(6) > .v-input').type('321654987');
    cy.get(':nth-child(7) > .v-input').type('321654987');

    cy.get('.v-card__actions > .text-none > .v-btn__content').click();

    cy.wait(1000);
    cy.get('.v-snack__content').contains('Registrado con exito!');
    cy.wait(1000);
    cy.get('.hidden-sm-and-down.v-btn').click();
    cy.get('.v-menu__content > .v-card > .v-card__actions > .v-btn').click();
  });
});
