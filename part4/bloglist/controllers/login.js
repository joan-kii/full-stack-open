const jwt = require('jsonwebtoken');
const bycript = require('bcryptjs');
const loginRouter = require('express').Router();

const User = require('../models/users');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username }).populate('blogs', {
    title: 1, author: 1, likes: 1, url: 1,
  });
  const passwordCorrect = user === null
    ? false
    : await bycript.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      blogs: user.blogs,
    });
  return null;
});

module.exports = loginRouter;
