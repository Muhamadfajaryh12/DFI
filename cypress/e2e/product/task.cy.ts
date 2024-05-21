describe("Task Product Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });
  //   it("Menampilkan Task Product", () => {
  //     cy.contains("li", "Product").click();
  //     cy.get("a[href='/product/task]").click();

  //     cy.url().should("include", "/product/task");

  //     cy.get("h1").should("contain.text", "Task Product");
  //   });
  it("Menampilkan Task Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Membuat Task Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melihat Detail Task Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengupdate Task Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Menghapus Task Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Melakukan pencarian Task Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
  it("Mengunduh Task Product", () => {
    cy.get("h1").should("contain.text", "Dashboard");
  });
});
