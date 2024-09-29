/// <reference types="cypress" />

context("Network Requests", (): void => {
  const baseUrl: string = "https://jsonplaceholder.cypress.io";

  beforeEach((): void => {
    cy.visit("https://example.cypress.io/commands/network-requests");
  });

  it("comments returns 200 and 500 body length", (): void => {
    // https://on.cypress.io/request
    cy.request(`${baseUrl}/comments`).should((response: Cypress.Response<any>) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("length").and.be.oneOf([500, 501]);
    });
  });

  it("Can create new user on /posts", (): void => {
    cy.request("POST", `${baseUrl}/posts`, {
      userId: 11,
      title: "Cypress Test Runner",
      body: "new body",
    }).then((response: Cypress.Response<any>) => {
      expect(response).property("status").to.equal(201); // new entity created
      expect(response).property("body").to.contain({
        title: "Cypress Test Runner",
      });
      expect(response.body).property("id").to.be.a("number").and.to.be.gt(100);
      expect(response.body).property("userId").to.be.a("number");
    });
  });

  it("cy.request() - save response in the shared test context", (): void => {
    // https://on.cypress.io/variables-and-aliases
    cy.request("https://jsonplaceholder.cypress.io/users?_limit=1")
      .its("body")
      .its("0") // yields the first element of the returned list
      .as("user") // saves the object in the test context
      .then(function () {
        cy.request("POST", "https://jsonplaceholder.cypress.io/posts", {
          userId: this.user.id,
          title: "Cypress Test Runner",
          body: "Fast, easy and reliable testing for anything that runs in a browser.",
        })
          .its("body")
          .as("post"); // save the new post from the response
      })
      .then(function () {
        expect(this.post, "post has the right user id").property("userId").to.equal(this.user.id);
      });
  });

  it("cy.intercept() - route responses to matching requests", (): void => {
    // https://on.cypress.io/intercept

    const message = "whoa, this comment does not exist";

    // Listen to GET to comments/1
    cy.intercept("GET", "**/comments/*").as("getComment");
    cy.get(".network-btn").click();

    // https://on.cypress.io/wait
    cy.wait("@getComment").its("response.statusCode").should("be.oneOf", [200, 304]);

    // Listen to POST to comments
    cy.intercept("POST", "**/comments").as("postComment");

    // we have code that posts a comment when
    // the button is clicked in scripts.js
    cy.get(".network-post").click();
    cy.wait("@postComment").should(({ request, response }) => {
      expect(request.body).to.include("email");
      expect(request.headers).to.have.property("content-type");
      expect(response && response.body).to.have.property("name", "Using POST in cy.intercept()");
    });

    // Stub a response to PUT comments/ ****
    cy.intercept(
      {
        method: "PUT",
        url: "**/comments/*",
      },
      {
        statusCode: 404,
        body: { error: message },
        headers: { "access-control-allow-origin": "*" },
        delayMs: 500,
      }
    ).as("putComment");

    // we have code that puts a comment when
    // the button is clicked in scripts.js
    cy.get(".network-put").click();

    cy.wait("@putComment");

    // our 404 statusCode logic in scripts.js executed
    cy.get(".network-put-comment").should("contain", message);
  });

  it("GET /comments with query parameters", (): void => {
    cy.request({
      url: `${baseUrl}/comments`,
      qs: {
        postId: 1,
        id: 3,
      },
    })
      .its("body")
      .should("be.an", "array")
      .and("have.length", 1)
      .its("0") // yields first element of the array
      .should("contain", {
        postId: 1,
        id: 3,
      });
  });
});
