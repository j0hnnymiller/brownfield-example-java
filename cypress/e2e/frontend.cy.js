describe("Frontend Test Spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit index and load successfully", () => {
    cy.url().should("include", "/");
    cy.get(".App").should("exist");
  });

  it("should display the app header", () => {
    cy.get(".App-header").should("be.visible");
  });

  it("should display the React logo", () => {
    cy.get(".App-logo").should("be.visible").and("have.attr", "alt", "logo");
  });

  it("should display edit instruction text", () => {
    cy.contains("Edit").should("be.visible");
    cy.contains("src/App.tsx").should("be.visible");
  });

  it("should display Learn React link with correct attributes", () => {
    cy.contains("Learn React")
      .should("have.attr", "href", "https://reactjs.org")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer");
  });

  it("should have proper page structure", () => {
    cy.get(".App").within(() => {
      cy.get("header.App-header").should("exist");
      cy.get("img.App-logo").should("exist");
      cy.get("p").should("exist");
      cy.get("a.App-link").should("exist");
    });
  });

  it("should not have console errors", () => {
    cy.window().then((win) => {
      cy.spy(win.console, "error");
    });
    cy.window().its("console.error").should("not.be.called");
  });
});
