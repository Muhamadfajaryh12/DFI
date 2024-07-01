describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Menampilkan halaman login", () => {
    cy.get("h2").should("contain.text", "Sign In");
    cy.get("form").should("exist");
    cy.get("input[name='username']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button[type='submit']")
      .should("exist")
      .and("contain.text", "Submit");
  });

  it("Login sukses dengan menginput kredensial", () => {
    const username = "fajar";
    const password = "fajar";

    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/");
  });

  it("Login failed", () => {
    const username = "123";
    const password = "123";
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();
    cy.get(".Toastify__toast-body").should(
      "contain.text",
      "Incorrect username or password"
    );
  });

  it("Logout", () => {
    const username = "fajar";
    const password = "fajar";

    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/");

    cy.wait(4000);
    cy.contains("Logout").click();
  });
});
