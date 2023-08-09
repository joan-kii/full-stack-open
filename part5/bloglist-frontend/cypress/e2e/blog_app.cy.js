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
      cy.get('#login-btn').click();

      cy.get('#notification').should('contain', 'Joan Serrano is logged!');
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('#notification').should('have.css', 'border-style', 'solid');
    });

    it('it fails with wrong credentials', function () {
      cy.get('#username').type('liss');
      cy.get('#password').type('sexyMami');
      cy.get('#login-btn').click();

      cy.get('#notification').should('contain', 'Wrong Username or Password');
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('#notification').should('have.css', 'border-style', 'solid');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('joankii');
      cy.get('#password').type('sexyPapi');
      cy.get('#login-btn').click();
    });

    const fakeBlog1 = {
      title: 'New Test Blog',
      author: 'Dummy Author',
      url: 'https://fakesite.com',
    };

    it('a blog can be created', function () {
      cy.get('#toggable-show').should('contain', 'Create New Blog');
      cy.get('#toggable-show').click();

      cy.get('#title-input').should('be.visible');
      cy.get('#title-input').type(`${fakeBlog1.title}`);

      cy.get('#author-input').should('be.visible');
      cy.get('#author-input').type(`${fakeBlog1.author}`);

      cy.get('#url-input').should('be.visible');
      cy.get('#url-input').type(`${fakeBlog1.url}`);

      cy.get('#create-blog-btn').should('be.visible');
      cy.get('#create-blog-btn').click();

      cy.contains(`${fakeBlog1.title}`);
      cy.contains(`${fakeBlog1.author}`);
      cy.contains(`${fakeBlog1.url}`);
    });

    it('user can like a blog', function () {
      cy.get('#toggable-show').click();
      cy.get('#title-input').type(`${fakeBlog1.title}`);
      cy.get('#author-input').type(`${fakeBlog1.author}`);
      cy.get('#url-input').type(`${fakeBlog1.url}`);
      cy.get('#create-blog-btn').click();

      cy.contains('View').click();
      cy.get('#like-btn').click();

      cy.get('#likes').should('contain', '1');
    });

    it('user delete an owned blog', function () {
      cy.get('#toggable-show').click();
      cy.get('#title-input').type(`${fakeBlog1.title}`);
      cy.get('#author-input').type(`${fakeBlog1.author}`);
      cy.get('#url-input').type(`${fakeBlog1.url}`);
      cy.get('#create-blog-btn').click();

      cy.contains('View').click();
      cy.get('#remove-btn').click();

      cy.get('#notification').should('contain', `The blog ${fakeBlog1.title} by ${fakeBlog1.author} was removed!`);
    });

    it('only the creator can see delete blog button', function () {
      cy.get('#toggable-show').should('contain', 'Create New Blog');
      cy.get('#toggable-show').click();

      cy.get('#title-input').type(`${fakeBlog1.title}`);
      cy.get('#author-input').type(`${fakeBlog1.author}`);
      cy.get('#url-input').type(`${fakeBlog1.url}`);

      cy.get('#create-blog-btn').should('be.visible');
      cy.get('#create-blog-btn').click();

      cy.get('#logout-btn').click();

      const newUser = {
        username: 'liss',
        name: 'Liss Serrano',
        password: 'sexyMami',
      };

      cy.request('POST', 'http://localhost:3003/api/users', newUser);

      cy.get('#username').type('liss');
      cy.get('#password').type('sexyMami');
      cy.get('#login-btn').click();

      cy.contains(`${fakeBlog1.title}`);
      cy.contains(`${fakeBlog1.author}`);
      cy.contains(`${fakeBlog1.url}`);

      cy.contains('View').click();

      cy.get('#remove-btn').should('not.exist');
    });

    it('blogs list is shown by likes order', function () {
      const fakeBlog2 = {
        title: 'Another Test Blog',
        author: 'Fake Author',
        url: 'https://dummysite.com',
      };

      cy.contains('Create New Blog').click();
      cy.get('#title-input').type(`${fakeBlog1.title}`);
      cy.get('#author-input').type(`${fakeBlog1.author}`);
      cy.get('#url-input').type(`${fakeBlog1.url}`);
      cy.get('#create-blog-btn').click();

      cy.get('#new-test-blog').contains('View').click();
      cy.get('#new-test-blog').contains('Like').click();
      cy.get('#new-test-blog').get('#likes').should('contain', '1');
      cy.get('#new-test-blog').contains('Hide').click();

      cy.contains('Create New Blog').click();
      cy.get('#title-input').type(`${fakeBlog2.title}`);
      cy.get('#author-input').type(`${fakeBlog2.author}`);
      cy.get('#url-input').type(`${fakeBlog2.url}`);
      cy.get('#create-blog-btn').click();

      cy.get('#another-test-blog').contains('View').click();
      cy.get('#another-test-blog').contains('Like').click();
      cy.get('#another-test-blog').get('#likes').should('contain', '1');
      cy.get('#another-test-blog').contains('Like').click();
      cy.get('#another-test-blog').get('#likes').should('contain', '2');
      cy.get('#another-test-blog').contains('Hide').click();

      cy.get('.blog').eq(0).should('contain', `${fakeBlog2.title}`);
      cy.get('.blog').eq(1).should('contain', `${fakeBlog1.title}`);
    });
  });
});
