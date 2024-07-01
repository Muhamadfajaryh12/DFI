describe("Task Product Page", () => {
  beforeEach(() => {
    cy.login("qc", "qc");
  });

  it("Menampilkan Task Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Task Product").click();
    cy.url().should("include", "/product/task");
  });

  it("Membuat Task Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Task Product").click();
    cy.url().should("include", "/product/task");
    cy.wait(4000);
    cy.contains("Create").click();
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Task Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Task Product").click();
    cy.url().should("include", "/product/task");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Mengupdate Task Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Task Product").click();
    cy.url().should("include", "/product/task");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Menghapus Task Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Task Product").click();
    cy.url().should("include", "/product/task");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-danger p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Melakukan pencarian Task Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Task Product").click();
    cy.url().should("include", "/product/task");
    cy.wait(4000);
    cy.get(".w-72.p-inputtext.p-component").type("test");
  });

  it("Mengunduh Task Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Task Product").click();
    cy.url().should("include", "/product/task");
    cy.wait(4000);
    cy.contains("PDF").click();
  });
});
