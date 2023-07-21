// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'First Test Blog',
    author: 'Joankii',
    url: 'first-test-blog',
    likes: 10,
  },
  {
    title: 'Second Test Blog',
    author: 'Joankii',
    url: 'second-test-blog',
    likes: 4,
  },
  {
    title: 'Third Test Blog',
    author: 'Joankii',
    url: 'third-test-blog',
    likes: 2,
  },
];

let blogId = '';

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  blogId = blogObject.id;
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(3);
});

test('id is defined', async () => {
  const response = await api.get(`/api/blogs/${blogId}`);
  expect(response.body.id).toBeDefined();
});

test('create new blog', async () => {
  const newBlog = {
    title: 'Fourth Test Blog',
    author: 'Joankii',
    url: 'fourth-test-blog',
    likes: 18,
  };
  const response = await api
    .post('/api/blogs')
    .set('Content-type', 'application/json')
    .send(newBlog)
    .expect(201);
  expect(response.body.title).toBe(newBlog.title);
  const blogs = await api.get('/api/blogs');
  expect(blogs.body).toHaveLength(4);
});

afterAll(async () => {
  await mongoose.connection.close();
});
