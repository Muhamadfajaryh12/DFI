describe("Task Location Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  it("Menampilkan Task Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Task Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Task Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Task Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Task Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Task Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Task Location", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
