describe("Master Location Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Master Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Master Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Master Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Master Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Master Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Master Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Master Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
