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

      cy.get('#notification').should('contain', 'Joan Serrano is logged!');
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('#notification').should('have.css', 'border-style', 'solid');
    });

    it('it fails with wrong credentials', function () {
      cy.get('#username').type('liss');
      cy.get('#password').type('sexyMami');
      cy.get('#login-button').click();

      cy.get('#notification').should('contain', 'Wrong Username or Password');
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('#notification').should('have.css', 'border-style', 'solid');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('joankii');
      cy.get('#password').type('sexyPapi');
      cy.get('#login-button').click();
    });

    const newBlog = {
      title: 'New Test Blog',
      author: 'Dummy Author',
      url: 'https://fakesite.com',
    };

    it('a blog can be created', function () {
      cy.get('#toggable-show').should('contain', 'Create New Blog');
      cy.get('#toggable-show').click();

      cy.get('#title-input').should('be.visible');
      cy.get('#title-input').type(`${newBlog.title}`);

      cy.get('#author-input').should('be.visible');
      cy.get('#author-input').type(`${newBlog.author}`);

      cy.get('#url-input').should('be.visible');
      cy.get('#url-input').type(`${newBlog.url}`);

      cy.get('#create-blog-btn').should('be.visible');
      cy.get('#create-blog-btn').click();

      cy.contains(`${newBlog.title}`);
      cy.contains(`${newBlog.author}`);
      cy.contains(`${newBlog.url}`);
    });

    it('user can like a blog', function () {
      cy.get('#toggable-show').click();
      cy.get('#title-input').type(`${newBlog.title}`);
      cy.get('#author-input').type(`${newBlog.author}`);
      cy.get('#url-input').type(`${newBlog.url}`);
      cy.get('#create-blog-btn').click();

      cy.contains('View').click();
      cy.get('#like-btn').click();

      cy.get('#likes').should('contain', '1');
    });

    it('user delete an owned blog', function () {
      cy.get('#toggable-show').click();
      cy.get('#title-input').type(`${newBlog.title}`);
      cy.get('#author-input').type(`${newBlog.author}`);
      cy.get('#url-input').type(`${newBlog.url}`);
      cy.get('#create-blog-btn').click();

      cy.contains('View').click();
      cy.get('#remove-btn').click();

      cy.get('#notification').should('contain', `The blog ${newBlog.title} by ${newBlog.author} was removed!`);
    });
  });
});
