describe("Frontend Test Spec", () => {
  it("should render the starter content", () => {
    cy.visit("/");

    cy.contains("Edit").should("be.visible");
    cy.contains("src/App.tsx").should("be.visible");
    cy.contains("Learn React")
      .should("be.visible")
      .and("have.attr", "href", "https://reactjs.org");
  });
});
