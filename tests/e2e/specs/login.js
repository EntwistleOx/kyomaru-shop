describe("Login", () => {
  it("a user cant login with wrong credentials", () => {
    cy.visit("/");

    const login = cy.get(
      ".v-toolbar__content > :nth-child(7) > .v-btn__content"
    );
    login.click();

    cy.get(
      ".v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input"
    ).type("janedoe@maildrop.cc");
    cy.get(":nth-child(2) > .v-input").type("wrong");

    const btnLogin = cy.get(".v-card__actions > .text-none > .v-btn__content");
    btnLogin.click();

    cy.get(".v-snack__content").contains(
      "Ha ocurrido un error, intenta nuevamente."
    );
  });

  it("a user can login with right credentials", () => {
    cy.visit("/");

    const login = cy.get(
      ".v-toolbar__content > :nth-child(7) > .v-btn__content"
    );
    login.click();

    cy.get(
      ".v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input"
    ).type("janedoe@maildrop.cc");
    cy.get(":nth-child(2) > .v-input").type("321654987");

    const btnLogin = cy.get(".v-card__actions > .text-none > .v-btn__content");
    btnLogin.click();

    cy.get(".v-snack__content").contains("Bienvenido");
  });
});
