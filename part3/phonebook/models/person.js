const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('Connecting to database')

mongoose.connect(url)
  .then(_ => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3, 
    required: true
  },
  number: {
    type: String,
    minLength: 9,
    validate: {
      validator: (number) => {
        return /\d{2,3}\-\d{6,8}/.test(number)
      },
      message: number => `${number.value} is not a valid phone number!`
    }, 
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
