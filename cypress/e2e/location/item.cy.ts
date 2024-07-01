describe("Item Location Page", () => {
  beforeEach(() => {
    cy.login("qc", "qc");
  });

  it("Menampilkan Item Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Item Location").click();
    cy.url().should("include", "/location/item");
  });

  it("Membuat Item Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Item Location").click();
    cy.url().should("include", "/location/item");
    cy.wait(4000);
    cy.contains("Create").click();
    cy.get('button[type="submit"]').click();
  });

  it("Melihat Detail Item Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Item Location").click();
    cy.url().should("include", "/location/item");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-primary p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Mengupdate Item Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Item Location").click();
    cy.url().should("include", "/location/item");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-warning p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Menghapus Item Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Item Location").click();
    cy.url().should("include", "/location/item");
    cy.wait(4000);
    cy.get(
      'button[class="mx-1 p-button-danger p-mr-2 p-button p-component p-button-icon-only"]'
    );
  });

  it("Melakukan pencarian Item Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Item Location").click();
    cy.url().should("include", "/location/item");
    cy.wait(4000);
    cy.get(".w-72.p-inputtext.p-component").type("test");
  });

  it("Mengunduh Item Location", () => {
    cy.wait(4000);

    cy.get("aside").should("be.visible");
    cy.wait(4000);
    cy.contains("Location").click();
    cy.wait(1000);
    cy.contains("Item Location").click();
    cy.url().should("include", "/location/item");
    cy.wait(4000);
    cy.contains("PDF").click();
  });
});
