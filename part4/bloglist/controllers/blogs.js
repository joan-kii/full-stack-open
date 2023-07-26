const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/users');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 });
  response.send(blog);
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.user.id);
  const blog = new Blog({
    ...request.body,
    user: user.id,
  });
  const result = await blog.save();
  if (result) {
    response.status(201).send(result);
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = user.blogs.concat(result._id);
    await user.save();
  } else {
    response.status(400);
  }
  return null;
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (request.user.id === blog.user.toString()) {
    await Blog.findByIdAndRemove(blog.id);
    response.status(200).send(blog);
  } else {
    response.status(404);
  }
  return null;
});

blogsRouter.put('/:id', async (request, response) => {
  const result = await Blog
    .findByIdAndUpdate(request.params.id, { likes: request.body.likes }, { new: true });

  if (result) {
    response.status(200).send(result);
  } else {
    response.status(400);
  }
});

module.exports = blogsRouter;
