describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Dashboard", () => {
    cy.wait(4000);
    cy.get("h3").should("contain.text", "Dashboard");
  });

  it("Mengunduh data Dashboard", () => {
    cy.wait(4000);
    cy.get('button[data-pr-tooltip="PDF"]').click();
  });

  it("Melakukan filter Dashboard", () => {
    cy.wait(4000);

    cy.get('select[name="id_master_product"]').select("test");

    cy.get('input[name="start_date"]').type("2024-01-01");

    cy.get('input[name="end_date"]').type("2024-12-31");

    cy.get('button[type="submit"]').click();
  });
});
