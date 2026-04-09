const apiUrl = `${Cypress.env("apiUrl")}`;

describe("Backend Test Spec", () => {
  it("should call ping", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("pong");
      expect(response.headers["content-type"]).to.contain("text/plain");
    });
  });
});
