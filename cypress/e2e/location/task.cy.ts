describe("Task Location Page", () => {
  beforeEach(() => {
    cy.login("qc", "qc");
  });

  it("Menampilkan Task Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Task Location").click();
    cy.url().should("include", "/location/task");
  });

  it("Membuat Task Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Task Location").click();
    cy.url().should("include", "/location/task");
    cy.wait(4000);
    cy.contains("Create").click();
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Task Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Task Location").click();
    cy.url().should("include", "/location/task");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Mengupdate Task Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Task Location").click();
    cy.url().should("include", "/location/task");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Menghapus Task Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Task Location").click();
    cy.url().should("include", "/location/task");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-danger p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Melakukan pencarian Task Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Task Location").click();
    cy.url().should("include", "/location/task");
    cy.wait(4000);
    cy.get(".w-72.p-inputtext.p-component").type("test");
  });

  it("Mengunduh Task Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Task Location").click();
    cy.url().should("include", "/location/task");
    cy.wait(4000);
    cy.contains("PDF").click();
  });
});
