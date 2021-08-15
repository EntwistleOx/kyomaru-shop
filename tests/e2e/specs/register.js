import firebase from "firebase";

describe("Register", () => {
  beforeEach(() => {
    const user = firebase.auth().currentUser;
    user
      .delete()
      .then(() => {
        console.log("User deleted.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("a user cant register with already used email", () => {
    cy.visit("/");

    const register = cy.get(".v-toolbar__content > :nth-child(6)");
    register.click();

    cy.get(
      ".v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input"
    ).type("Jane");
    cy.get(
      ".v-window-item--active > .v-card__text > .container > .row > :nth-child(2) > .v-input"
    ).type("Doe");
    cy.get(".row > :nth-child(3) > .v-input").type("15837344-0");
    cy.get(":nth-child(4) > .v-input").type("56912345678");
    cy.get(":nth-child(5) > .v-input").type("janedoe@maildrop.cc");
    cy.get(":nth-child(6) > .v-input").type("321654987");
    cy.get(":nth-child(7) > .v-input").type("321654987");

    const btnLogin = cy.get(".v-card__actions > .text-none > .v-btn__content");
    btnLogin.click();

    cy.get(".v-snack__content").contains(
      "La cuenta de correo ya se encuentra en uso. Intenta con otra."
    );
  });

  it.only("a user can register with a new email", () => {
    cy.visit("/");

    const register = cy.get(".v-toolbar__content > :nth-child(6)");
    register.click();

    cy.get(
      ".v-window-item--active > .v-card__text > .container > .row > :nth-child(1) > .v-input"
    ).type("John");
    cy.get(
      ".v-window-item--active > .v-card__text > .container > .row > :nth-child(2) > .v-input"
    ).type("Wick");
    cy.get(".row > :nth-child(3) > .v-input").type("15837344-0");
    cy.get(":nth-child(4) > .v-input").type("56912345678");
    cy.get(":nth-child(5) > .v-input").type("johnwick@maildrop.cc");
    cy.get(":nth-child(6) > .v-input").type("321654987");
    cy.get(":nth-child(7) > .v-input").type("321654987");

    const btnLogin = cy.get(".v-card__actions > .text-none > .v-btn__content");
    btnLogin.click();

    cy.get(".v-snack__content").contains("Registrado con exito!");
  });
});
