/// <reference types="Cypress" />
import elements from "../pageObjects/elements";

describe("USE CASE 1: Home Page", () => {
  const inputField = new elements();
  let data;
  before(function () {
    cy.fixture("example").then(function (fdata) {
      data = fdata;
    });
  });

  beforeEach(() => {
    cy.visit(Cypress.env("url"));
    const acceptButton = cy.get("button[id='popin_tc_privacy_button']", {
      withinSubject: parent.document.body,
    });
    acceptButton.click();
  });

  it("TC no.01: Verfugbarkeit button is disabled with one empty input field", () => {
    inputField.getZipCodeField().type(data.zipcode);
    cy.get(".gas-dropdown__items").click();
    inputField.getAddressField().type(data.address);
    cy.get(".mn-vcbadge__form__button button").should("be.disabled");
  });

  it("TC no.02: User can't use the next input field if the current is unpopulated", () => {
    inputField.getZipCodeField().type(data.zipcode);
    cy.get(".gas-dropdown__items").click();
    cy.get("#houseNumberWithExtension").click().should("not.be.enabled");
  });

  it("TC no.03: Input field displays error message for incorent/not existing value", () => {
    const random_input = "Test123";
    inputField.getZipCodeField().type(random_input);
    cy.contains("Nicht vorhanden").should("be.visible");
  });

  it("TC no.04: User navigates to Mein Tarif page", () => {
    inputField.getZipCodeField().type(data.zipcode);
    cy.get(".gas-dropdown__items").click();
    inputField.getAddressField().type(data.address);
    cy.get(".gas-dropdown").eq(1).click();
    cy.get("#houseNumberWithExtension").type("1{enter}");
    cy.contains("1").click({ force: true });
    cy.get("#submitButtonVc").click().click();
  });
});
