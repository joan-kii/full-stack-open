// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(2);
});

afterAll(async () => {
  await mongoose.connection.close();
});
