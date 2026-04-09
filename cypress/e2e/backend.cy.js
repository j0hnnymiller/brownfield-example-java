const apiUrl = `${Cypress.env("apiUrl")}`;

describe("Backend Test Spec", () => {
  it("should call ping and receive pong response", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("pong");
      expect(response.headers["content-type"]).to.include("text/plain");
    });
  });

  it("should return correct status code", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/ping`,
    })
      .its("status")
      .should("eq", 200);
  });

  it("should not return empty response", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.body).to.not.be.empty;
      expect(response.body).to.be.a("string");
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it("should handle multiple consecutive requests", () => {
    for (let i = 0; i < 3; i++) {
      cy.request({
        method: "GET",
        url: `${apiUrl}/ping`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.eq("pong");
      });
    }
  });

  it("should respond within acceptable time", () => {
    const startTime = Date.now();
    cy.request({
      method: "GET",
      url: `${apiUrl}/ping`,
    }).then((response) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      expect(response.status).to.eq(200);
      expect(duration).to.be.lessThan(5000); // Should respond within 5 seconds
    });
  });
});
