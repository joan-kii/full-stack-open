// eslint-disable-next-line import/no-extraneous-dependencies
const bycript = require('bcryptjs');
const usersRouter = require('express').Router();

const User = require('../models/users');

usersRouter.post('/', async (request, response) => {
  console.log(request.body);
  const { username, name, password } = request.body;
  console.log(username, name, password);
  const saltRounds = 10;
  const passwordHash = await bycript.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).send(savedUser);
});

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
