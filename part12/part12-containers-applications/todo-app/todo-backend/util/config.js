const MONGO_URL = 'mongodb://the_username:the_password@mongo:27017/the_database' // process.env.MONGO_URL || undefined
const REDIS_URL = 'redis://redis:6379' // process.env.REDIS_URL || undefined

module.exports = {
  MONGO_URL,//: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL//: 'redis://localhost:6379'
}