describe("Patrol Location Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Patrol Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Patrol Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Patrol Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Patrol Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Patrol Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Patrol Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Patrol Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
