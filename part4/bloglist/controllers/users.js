// eslint-disable-next-line import/no-extraneous-dependencies
const bycript = require('bcryptjs');
const usersRouter = require('express').Router();

const User = require('../models/users');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length < 3) {
    response.status(400).json({ error: 'Password must have a min length of 3' });
  } else {
    const saltRounds = 10;
    const passwordHash = await bycript.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).send(savedUser);
  }
});

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1, title: 1, author: 1, name: 1, id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
