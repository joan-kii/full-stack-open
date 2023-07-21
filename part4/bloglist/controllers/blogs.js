const blogsRouter = require('express').Router();

const Blog = require('../models/blog');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.send(blog);
});

blogsRouter.post('/', async (request, response) => {
  console.log(request.body);
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).send(result);
});

module.exports = blogsRouter;
