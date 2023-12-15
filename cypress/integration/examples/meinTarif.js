/// <reference types="Cypress" />

describe("USE CASE 2: Mein Tarif", () => {
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

  it("TC no.01: Compare max internet speed from the title and section", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.compareTwoElements(".speed", ".max-speed p");
  });

  it("TC no.02: User is presented with a recommended Internet option", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.get(".mn-tariff--recommendation span")
      .last()
      .should("have.text", "Unsere Empfehlung");
  });

  it("TC no.03: User can change between different Internet options", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.get("div .tariff-option-column").each(($option) => {
      cy.wrap($option).find("button").click({ force: true });
      cy.wrap($option).find("button").should("have.text", " ausgewählt ");
    });
  });

  it("TC no.04: User opens only available Internet tarif pop ups", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.get(".mn-tarif--prices .hover-hint").each(($el) => {
      cy.wrap($el).click({ force: true });
      cy.wrap($el).get(".modal-body").should("be.visible");
      cy.get(".modal-header .mn-btn--close-big").click();
      cy.wait(2000);
    });

    cy.get(".mn-tarif--property").each(($el, $index, $list) => {
      cy.get(".mn-tarif--property")
        .eq($index)
        .invoke("attr", "class")
        .then(($value) => {
          if (!String($value).includes("disabled")) {
            cy.get(".mn-tarif--property .title")
              .eq($index)
              .click({ force: true });
            cy.wait(2000);
            cy.get(".modal-header .mn-btn--close-big").click({ force: true });
          } else cy.wait(1000);
        });
    });
  });

  it("TC no.05: User can change all available WLAN-Router options", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.get(".mn-router-options swiper-slide").each(($slide) => {
      cy.wrap($slide).click();
      cy.wrap($slide).find("button").should("have.text", " ausgewählt ");
    });
  });

  it("TC no.06: User can change all available Telefon options", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.get("#mnet-phone-options swiper-slide").each(($slide) => {
      cy.wrap($slide).click();
      cy.wrap($slide).find("button").should("have.text", " ausgewählt ");
    });
  });

  it("TC no.08: User can't select two International-Flat options", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.get("#mnet-phone-options swiper-slide").eq(1).click();
    cy.contains("Mobil-Flat").click();
    cy.contains("International-Flat M").click();
    cy.contains("International-Flat L").click();
    cy.get("#mnet-flatrate-options .option")
      .eq(1)
      .invoke("attr", "class")
      .then(($value) => {
        expect($value).to.equal("option");
      });
  });

  it("TC no.09: User changes the Vertrags option", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.contains("Ohne Vertragslaufzeit").click({ force: true });
    cy.contains("30 € Online-Vorteil").should("not.exist");
    cy.get(".tariff-option-column").each(($el) => {
      cy.wrap($el)
        .find(".mn-input--radio")
        .next()
        .invoke("attr", "class")
        .then(($classValue) => {
          expect($classValue).to.contain("selectedMvl");
        });
    });
    cy.get(".mn-tarif--deliveryPrice .ng-star-inserted").should("not.exist");
  });

  it("TC no.10: User continues from Mein Tarif to Tarif-Option page", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.goTo_TarifOptionen();
  });

  it("TC no.11: User continues from Mein Tarif to Tarif-Option page with different options", () => {
    cy.startNavigation(data.zipcode, data.address);
    cy.get("div .tariff-option-column").find("button").eq(3);
    cy.contains("FRITZ!Box 7590 AX").click();
    cy.get("#mnet-phone-options swiper-slide").eq(1).click();
    cy.contains("Mobil-Flat").click();
    cy.contains("International-Flat M").click();
    cy.goTo_TarifOptionen();
  });
});
