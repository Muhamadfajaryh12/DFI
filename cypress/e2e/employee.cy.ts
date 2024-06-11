describe("Employee Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Employee", () => {
    cy.wait(3000);
    cy.get("h3").should("contain.text", "Employee");
  });

  it("Membuat Employee", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(3000);
    cy.contains("Create").click();
    cy.get('input[name="username_employee"]').type("fajartest");
    cy.get('input[name="name_employee"]').type("fajar");
    cy.get('input[name="no_telp_employee"]').type("081234567890");
    cy.get('select[name="gender"]').select("Male");
    cy.get('select[name="city"]').select("Jakarta");
    cy.get('select[name="role"]').select("Admin");
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Employee", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(3000);
  });

  it("Mengupdate Employee", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(3000);
  });

  it("Menghapus Employee", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(3000);
  });

  it("Melakukan pencarian Employee", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(3000);
  });

  it("Mengunduh Employee", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Employee").click();
    cy.url().should("include", "/employee");
    cy.wait(3000);
  });
});
