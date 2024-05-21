describe("Patrol Product Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Patrol Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Patrol Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Patrol Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Patrol Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Patrol Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Patrol Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Patrol Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
