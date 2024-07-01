describe("Patrol Product Page", () => {
  beforeEach(() => {
    cy.login("qc", "qc");
  });

  it("Menampilkan Patrol Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Patrol Product").click();
    cy.url().should("include", "/product/patrol");
  });

  it("Membuat Patrol Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Patrol Product").click();
    cy.url().should("include", "/product/patrol");
    cy.wait(4000);
    cy.contains("Create").click();
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Patrol Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Patrol Product").click();
    cy.url().should("include", "/product/patrol");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Mengupdate Patrol Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Patrol Product").click();
    cy.url().should("include", "/product/patrol");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Menghapus Patrol Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Patrol Product").click();
    cy.url().should("include", "/product/patrol");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-danger p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Melakukan pencarian Patrol Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Patrol Product").click();
    cy.url().should("include", "/product/patrol");
    cy.wait(4000);
    cy.get(".w-72.p-inputtext.p-component").type("test");
  });

  it("Mengunduh Patrol Product", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Product").click();
    cy.wait(1000);
    cy.contains("Patrol Product").click();
    cy.url().should("include", "/product/patrol");
    cy.wait(4000);
    cy.contains("PDF").click();
  });
});
