describe("Employee Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Employee", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Employee").click();
    cy.get("h3").should("contain.text", "Employee");
  });

  it("Membuat Employee", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(4000);
    cy.contains("Create").click();
    cy.get('input[name="username_employee"]').type("fajartest");
    cy.get('input[name="name_employee"]').type("fajar");
    cy.get('input[name="no_telp_employee"]').type("081234567890");
    cy.get('select[name="gender"]').select("Perempuan");
    cy.get('select[name="city"]').select("Jakarta");
    cy.get('select[name="role"]').select("Admin");
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Employee", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Mengupdate Employee", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Menghapus Employee", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-danger p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Melakukan pencarian Employee", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(4000);
    cy.get(".w-72.p-inputtext.p-component").type("test");
  });

  it("Mengunduh Employee", () => {
    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(4000);
    cy.contains("PDF").click();
  });
});
