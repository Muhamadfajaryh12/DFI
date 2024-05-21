describe("Profile Page", () => {
  beforeEach(() => {
    cy.login("fajar", "fajar");
  });

  it("Menampilkan Halaman Profile", () => {
    cy.get("a[href='/profile']").click();
    cy.url().should("include", "/profile");
    cy.get("h1").should("contain.text", "Profile");
  });

  it("Melakukan Change Password", () => {
    cy.get("a[href='/profile']").click();
    cy.get('button[aria-label="Change Password"]').click();
    cy.get('input[name="old_password"]');
    cy.get('input[name="new_password"]');
  });
});
