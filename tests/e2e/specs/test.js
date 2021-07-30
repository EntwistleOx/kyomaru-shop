// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('add a produdct to cart', () => {
    cy.visit('/');
    const firstProduct = cy.get(
      ':nth-child(2) > .row > :nth-child(2) > a > .v-card > .v-image > .v-responsive__content',
    );
    firstProduct.click();

    const btnToBuy = cy.get('.ml-6 > .v-btn__content');
    btnToBuy.click();

    const btnGoCart = cy.get('.v-badge > .v-icon');
    btnGoCart.click();

    cy.get('.v-card');
  });
});
