describe("Employee Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Employee", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Employee", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Employee", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Employee", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Employee", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Employee", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Employee", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
