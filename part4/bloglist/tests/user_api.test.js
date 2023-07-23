// eslint-disable-next-line import/no-extraneous-dependencies
const bycript = require('bcryptjs');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/users');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bycript.hash('sekret', 10);
  const user = new User({ username: 'root', name: 'root', passwordHash });
  await user.save();
});

describe('when there is initially one user in db', () => {
  test('create user success', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'joankii',
      name: 'Joan',
      password: 'myPassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
