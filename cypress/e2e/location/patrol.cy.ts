describe("Patrol Location Page", () => {
  beforeEach(() => {
    cy.login("qc", "qc");
  });

  it("Menampilkan Patrol Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Patrol Location").click();
    cy.url().should("include", "/location/patrol");
  });

  it("Membuat Patrol Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Patrol Location").click();
    cy.url().should("include", "/location/patrol");
    cy.wait(4000);
    cy.contains("Create").click();
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Patrol Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Patrol Location").click();
    cy.url().should("include", "/location/patrol");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Mengupdate Patrol Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Patrol Location").click();
    cy.url().should("include", "/location/patrol");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Menghapus Patrol Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Patrol Location").click();
    cy.url().should("include", "/location/patrol");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-danger p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Melakukan pencarian Patrol Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Patrol Location").click();
    cy.url().should("include", "/location/patrol");
    cy.wait(4000);
    cy.get(".w-72.p-inputtext.p-component").type("test");
  });

  it("Mengunduh Patrol Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Patrol Location").click();
    cy.url().should("include", "/location/patrol");
    cy.wait(4000);
    cy.contains("PDF").click();
  });
});
