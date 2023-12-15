/// <reference types="cypress" />

describe("m-net API calls", () => {
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

  it("Incercept existing entries from the user from the home page", () => {
    cy.intercept("GET", "https://shop.m-net.de/api/location?geoId=1085591").as(
      "mnet-response"
    );
    cy.startNavigation(data.zipcode, data.address);
    cy.wait("@mnet-response").then((API) => {
      expect(API.response.body.postalCode).to.eq("81241");
      expect(API.response.body.houseNumber).to.eq("1");
      expect(API.response.body).to.have.property("hash");
    });
    cy.request("https://shop.m-net.de/api/check24/evaluations").then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });

  it("Mock existing entries from the user from the home page", () => {
    cy.intercept("GET", "https://shop.m-net.de/api/location?geoId=*", {
      postalCode: "97070",
      houseNumber: "14A",
    }).as("mnet-response");
    cy.startNavigation(data.zipcode, data.address);
    cy.wait("@mnet-response").then((API) => {
      expect(API.response.body.postalCode).to.eq("97070");
      expect(API.response.body.houseNumber).to.eq("14A");
    });
    cy.request("https://shop.m-net.de/api/check24/evaluations").then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });
});
