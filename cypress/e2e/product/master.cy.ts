describe("Master Product Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Master Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Master Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Master Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Master Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Master Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Master Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Master Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
