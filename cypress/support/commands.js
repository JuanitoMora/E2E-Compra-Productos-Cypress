// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('postRegister', (username, password, gender, day, month, year) => {
    cy.request({
        url: `https://pushing-it.onrender.com/api/register`,
        method: "POST",
        body: {
            username,
            password,
            gender,
            day,
            month,
            year
        }
    })
});

Cypress.Commands.add('postLogin', (username, password) => {
    cy.request({
        url: `https://pushing-it.onrender.com/api/login`,
        method: "POST",
        body: {
            username,
            password
        }
    })
});

Cypress.Commands.add('deleteUser', (username) => {
    cy.request({
        url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
        method: "DELETE",
        failOnStatusCode: false
    })
});