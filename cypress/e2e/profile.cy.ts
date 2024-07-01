describe("Profile Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Halaman Profile", () => {
    cy.wait(4000);
    cy.get("a[href='/profile']").click();
    cy.url().should("include", "/profile");
    cy.wait(4000);
    cy.get("h3").should("contain.text", "Profile");
  });

  it("Melakukan Change Password", () => {
    cy.wait(4000);
    cy.get("a[href='/profile']").click();
    cy.wait(4000);
    cy.get('button[aria-label="Change Password"]').click();
    cy.get('input[name="old_password"]').type("fajar");
    cy.get('input[name="new_password"]').type("fajar");
    cy.get('button[type="submit"]').click();
  });

  it("Mengubah Profile", () => {
    cy.wait(4000);
    cy.get("a[href='/profile']").click();
    cy.url().should("include", "/profile");
  });
});
