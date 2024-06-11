describe("Category Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Category", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
  });

  it("Membuat Category", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(3000);
    cy.contains("Create").click();
    cy.get('input[name="name_category"]').type("Category Name");
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Category", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(3000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2"] > .pi-info-circle'
    ).click();
  });

  it("Mengupdate Category", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(3000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2"] > .pi-pi-pencil'
    ).click();
  });

  it("Menghapus Category", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(3000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2"] > .pi-pi-pencil'
    ).click();
  });

  it("Melakukan pencarian Category", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(3000);
  });

  it("Mengunduh Category", () => {
    cy.get("aside").should("be.visible");
    cy.wait(3000);
    cy.contains("Category").click();
    cy.url().should("include", "/category");
    cy.wait(3000);
  });
});
