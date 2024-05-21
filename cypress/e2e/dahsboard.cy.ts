describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Dashboard", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan filter Dashboard", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh data Dashboard", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
