/// <reference types="cypress" />

describe("Network Requests", (): void => {
  const baseUrl: string = "https://jsonplaceholder.typicode.com";

  it("GET one todo returns one todo", (): void => {
    // https://on.cypress.io/request
    cy.request(`${baseUrl}/todos/1`).should((response: Cypress.Response<any>) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("userId").and.equal(1);
      //should we check anything else?
    });
  });

  it("GET comments returns 200 and 500 body length", (): void => {
    // https://on.cypress.io/request
    cy.request(`${baseUrl}/comments`).should((response: Cypress.Response<any>) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("length").and.be.oneOf([500, 501]);
    });
  });

  it("GET a comment on postId 1 and id=2 returns valid email", (): void => {
    // https://on.cypress.io/request
    cy.request(`${baseUrl}/comments?postId=1&id=2`).should((response: Cypress.Response<any>) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property("email").and.equal("Jayne_Kuhic@sydney.com");
    });
  });

  it("GET /comments with cy.request({qs:})", (): void => {
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

  it("Can create new post on /posts", (): void => {
    // resource will not be really updated on the server but it will be faked as if
    cy.request("POST", `${baseUrl}/posts`, {
      userId: 11,
      title: "Cypress Test",
      body: "new body",
    }).then((response) => {
      console.log(response);
      // expect the response status to be 201
      expect(response).property("status").to.equal(201); // new entity created
      // expect the response body to contain the title = "Cypress Test"
      expect(response.body).to.contain({
        title: "Cypress Test",
      });
    });
  });

  it("Can create new user on /posts v2", (): void => {
    // resource will not be really updated on the server but it will be faked as if
    cy.request("POST", `${baseUrl}/posts`, {
      userId: 11,
      title: "Cypress POST",
      body: "w/ aliasing",
    }).as("post");

    cy.get("@post").then(console.log);

    cy.get("@post").then((response: JQuery<HTMLElement>) => {
      // console.log("response:", response);
      // expect the response status to be 201
      expect(response).property("status").to.equal(201); // new entity created
      // expect the response body to contain the title = "Cypress Test"
      expect((response as unknown as Cypress.Response<any>).body).to.contain({
        title: "Cypress POST",
      });
      cy.log("response:", response);
    });
  });

  it("Can update posts", (): void => {
    // a PUT is used to update an existing entity
    cy.request("PUT", `${baseUrl}/posts/1`, {
      id: 2,
      userId: 15,
      title: "foo",
      body: "bar",
    }).then((response) => {
      console.log(response);
      expect(response).property("status").to.equal(200);
      // same as expect(response).property("statusText")
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.contain({
        title: "foo",
        body: "bar",
      });
    });

    //* Normally, you would be able to do this
    // cy.request(`${baseUrl}/posts/1`).should((response) => {
    //   expect(response.status).to.eq(200);
    //   expect(response.body).to.contain({
    //     title: "foo",
    //     body: "bar"
    //   });
    // });
  });
});
