describe("Category Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Category", () => {
    cy.wait(2000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
  });

  it("Membuat Category", () => {
    cy.wait(3000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(4000);
    cy.contains("Create").click();
    cy.get('input[name="name_category"]').type("Category Name");
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Category", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Mengupdate Category", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Menghapus Category", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-danger p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Melakukan pencarian Category", () => {
    cy.wait(4000);
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(4000);
    cy.get(".w-72.p-inputtext.p-component").type("test");
  });

  it("Mengunduh Category", () => {
    cy.wait(3000);
    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(4000);
    cy.contains("PDF").click();
  });
});
