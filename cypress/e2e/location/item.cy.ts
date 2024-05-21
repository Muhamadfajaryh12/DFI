describe("Item Location Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Item Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Item Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Item Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Item Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Item Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Item Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Item Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
