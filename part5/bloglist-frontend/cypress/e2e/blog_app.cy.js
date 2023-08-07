/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'joankii',
      name: 'Joan Serrano',
      password: 'sexyPapi',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });

  describe('Login', function () {
    it('it success with correct credentials', function () {
      cy.get('#username').type('joankii');
      cy.get('#password').type('sexyPapi');
      cy.get('#login-button').click();

      cy.contains('Joan Serrano is logged!');
    });

    it('it fails with wrong credentials', function () {
      cy.get('#username').type('liss');
      cy.get('#password').type('sexyMami');
      cy.get('#login-button').click();

      cy.contains('Wrong Username or Password');
    });
  });
});
