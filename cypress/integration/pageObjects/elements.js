class elements {
  getZipCodeField() {
    return cy.get("#zipCodeWithCity");
  }

  getAddressField() {
    return cy.get("#streetWithDistrict");
  }
}

export default elements;
