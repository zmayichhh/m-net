// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("startNavigation", (zipcode, address) => {
  cy.get("#zipCodeWithCity").type(zipcode);
  cy.get(".gas-dropdown__items").click();
  cy.get("#streetWithDistrict").type(address);
  cy.get(".gas-dropdown").eq(1).click();
  cy.get("#houseNumberWithExtension").type("1{enter}");
  cy.contains("1").click({ force: true });
  cy.get("#submitButtonVc").click().click();
  cy.get(".cdk-overlay-pane button").click({ force: true });
});

Cypress.Commands.add("compareTwoElements", (element1, element2) => {
  let element1_value, element2_value;
  cy.get(element1)
    .last()
    .invoke("text")
    .then((textValue) => {
      element1_value = textValue;
    });

  cy.get(element2)
    .invoke("text")
    .then((textValue2) => {
      expect(textValue2).to.include(element1_value);
    });
});

Cypress.Commands.add("goTo_TarifOptionen", () => {
  cy.contains("Weiter zu Optionen").click();
  cy.url().should("eq", "https://shop.m-net.de/checkout/Optionen");
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
