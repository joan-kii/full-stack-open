const express = require('express');
const router = express.Router();
const redis = require('../redis');
const { Todo } = require('../mongo')

const configs = require('../util/config')

let visits = 0

const setRedis = async () => {
  const todos = await Todo.find({});
  await redis.setAsync('added_todos', todos.length);
};

setRedis();

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

module.exports = router;
