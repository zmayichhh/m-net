//const { expect } = require("chai");

describe("USE CASE 2: Mein Tarif", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("url"));
    const acceptButton = cy.get("button[id='popin_tc_privacy_button']", {
      withinSubject: parent.document.body,
    });
    acceptButton.click();
  });

  it("TC no.01: Compare max internet speed from the title and section", () => {
    cy.startNavigation();
    cy.compareTwoElements(".speed", ".max-speed p");
  });

  it("TC no.02: User is presented with a recommended Internet option", () => {
    cy.startNavigation();
    cy.get(".mn-tariff--recommendation span")
      .last()
      .should("have.text", "Unsere Empfehlung");
  });

  it.only("TC no.03: User can change between different Internet options", () => {
    cy.startNavigation();
    cy.get("div .tariff-option-column").each(($option) => {
      cy.wrap($option).find("button").click({ force: true });
      cy.wrap($option).find("button").should("have.text", " ausgewählt ");
    });
  });

  it.only("TC no.04: User opens every Internet tarif informations pop up", () => {
    cy.startNavigation();
  });
});