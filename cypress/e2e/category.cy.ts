describe("Category Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Category", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Category", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Category", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Category", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Category", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Category", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Category", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
