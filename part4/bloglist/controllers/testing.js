const testingRouter = require('express').Router();

const User = require('../models/users');
const Blog = require('../models/blog');

testingRouter.post('/reset', async (_request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
