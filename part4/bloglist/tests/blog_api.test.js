// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

let firstBlog = '';
let user = {};
beforeEach(async () => {
  await Blog.deleteMany({});
  // eslint-disable-next-line no-undef
  [firstBlog, ..._rest] = await Blog.insertMany(helper.initialBlogs);

  user = await api
    .post('/api/login')
    .set('Content-type', 'application/json')
    .send({ username: 'liss', password: 'myPassword' });
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(200)
      .expect('Content-type', /application\/json/);
  });
  test('there are three blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test('id is defined', async () => {
    const response = await api
    // eslint-disable-next-line no-underscore-dangle
      .get(`/api/blogs/${firstBlog._id}`)
      .set('Authorization', `Bearer ${user.body.token}`);
    expect(response.body.id).toBeDefined();
  });
});

describe('creates blogs properly', () => {
  test('create new blog with logged user', async () => {
    const newBlog = {
      title: 'Fourth Test Blog',
      author: 'Liss Serrano',
      url: 'fourth-test-blog',
      likes: 18,
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .set('Content-type', 'application/json')
      .send(newBlog)
      .expect(201);
    expect(response.body.title).toBe(newBlog.title);
    const blogs = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`);
    expect(blogs.body).toHaveLength(4);
  });

  test('do not create a new blog with invalid user', async () => {
    const newBlog = {
      title: 'Fourth Test Blog',
      author: 'Liss Serrano',
      url: 'fourth-test-blog',
      likes: 18,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer lol')
      .set('Content-type', 'application/json')
      .send(newBlog)
      .expect(401);
  });

  test('check likes property exists', async () => {
    const newBlog = {
      title: 'Fifth Test Blog',
      author: 'Joankii',
      url: 'fifth-test-blog',
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .set('Content-type', 'application/json')
      .send(newBlog)
      .expect(201);
    expect(response.body.likes).toBe(0);
  });

  test('missing title or url properties return bad request', async () => {
    const untitledBlog = {
      author: 'Joankii',
      url: 'fifth-test-blog',
      likes: 5,
    };
    const nonUrlBlog = {
      title: 'Fifth Test Blog',
      author: 'Joankii',
      likes: 3,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .set('Content-type', 'application/json')
      .send(untitledBlog)
      .expect(400);
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .set('Content-type', 'application/json')
      .send(nonUrlBlog)
      .expect(400);
  });
});

describe('delete blog', () => {
  test('delete blog by id', async () => {
    await api
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/api/blogs/${firstBlog._id}`)
      .expect(200);
  });
});

describe('update blog', () => {
  test('update blog by id', async () => {
    await api
      // eslint-disable-next-line no-underscore-dangle
      .put(`/api/blogs/${firstBlog._id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .set('Content-type', 'application/json')
      .send({ likes: 11 })
      .expect(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
