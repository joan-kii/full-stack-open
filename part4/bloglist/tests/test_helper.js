const User = require('../models/users');

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

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, usersInDB };
