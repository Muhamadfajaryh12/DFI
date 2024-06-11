describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Dashboard", () => {
    cy.get("h3").should("contain.text", "Dashboard");
  });

  it("Mengunduh data Dashboard", () => {
    cy.wait(3000);
    cy.get('button[data-pr-tooltip="PDF"]').click();
  });

  it("Melakukan filter Dashboard", () => {
    cy.get('select[name="id_master_product"]').select("Product Name");

    cy.get('input[name="start_date"]').type("2024-01-01");

    cy.get('input[name="end_date"]').type("2024-12-31");

    cy.get('button[type="submit"]').click();

    cy.wait(3000);
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });
});
