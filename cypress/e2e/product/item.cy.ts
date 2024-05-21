describe("Item Product Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Item Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Item Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Item Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Item Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Item Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Item Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Item Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
