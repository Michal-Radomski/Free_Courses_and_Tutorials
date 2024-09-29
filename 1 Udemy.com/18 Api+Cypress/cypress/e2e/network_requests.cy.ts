/// <reference types="cypress" />

//* https://example.cypress.io/commands/network-requests
//* context === describe
context("Network Requests", (): void => {
  beforeEach((): void => {
    cy.visit("https://example.cypress.io/commands/network-requests");
  });

  // Manage HTTP requests in your app
  it("cy.request() - make an XHR request", (): void => {
    // https://on.cypress.io/request
    cy.request("https://jsonplaceholder.cypress.io/comments").should((response: Cypress.Response<any>) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property("length").and.be.oneOf([500, 501]);
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
    });
  });

  it("cy.request() - verify response using BDD syntax", (): void => {
    cy.request("https://jsonplaceholder.cypress.io/comments").then((response: Cypress.Response<any>) => {
      // https://on.cypress.io/assertions
      expect(response).property("status").to.equal(200);
      expect(response).property("body").to.have.property("length").and.be.oneOf([500, 501]);
      expect(response).to.include.keys("headers", "duration");
    });
  });

  it("cy.request() with query parameters", (): void => {
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    cy.request({
      url: "https://jsonplaceholder.cypress.io/comments",
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

  it("cy.request() - pass result to the second request", (): void => {
    cy.request("https://jsonplaceholder.cypress.io/users?_limit=1")
      .its("body") // yields the response object
      .its("0") // yields the first element of the returned list
      .then((user) => {
        expect(user).property("id").to.be.a("number");
        // make a new post on behalf of the user
        cy.request("POST", "https://jsonplaceholder.cypress.io/posts", {
          userId: user.id,
          title: "Cypress Test Runner",
          body: "Fast, easy and reliable testing for anything that runs in a browser.",
        });
      })
      .then((response) => {
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
      .then(function (): void {
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

    cy.get(".network-put").click();

    cy.wait("@putComment");

    cy.get(".network-put-comment").should("contain", message);
  });
});
