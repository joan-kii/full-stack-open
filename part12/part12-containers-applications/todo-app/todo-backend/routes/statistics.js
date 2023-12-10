const express = require('express');
const router = express.Router();
const redis = require('../redis');

/* GET statistics. */
router.get('/', async (_, res) => {
  const statistics = await redis.getAsync('added_todos')
  res.send({added_todos: statistics });
});

module.exports = router;
