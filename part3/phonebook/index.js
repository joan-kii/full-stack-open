const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')
const { default: mongoose } = require('mongoose')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  Person.find({})
    .then(people => {
      const res = `<div><p>Phonebook has info for ${people.length} people</p><p>${Date()}</p></div>`
      response.send(res)
    })
    .catch(err => {
      console.log('Failed gettin people', err.message)
    })
    .then(_ => mongoose.connection.close())
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => {
      response.send(people)
    })
    .catch(err => {
      console.log('Failed gettin people', err.message)
    })
    .then(_ => mongoose.connection.close())
})

app.get('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id)
  Person.findById({personId})
    .then(person => {
      response.send(person)
    })
    .catch(err => {
      console.log('No person with this id', err.message)
      response.status(500).end()
    })
    .then(_ => mongoose.connection.close())
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    response.status(400).json({error: 'content missing'})
  } else if (persons.some(person => person.name === body.name)) {
    response.status(400).json({error: 'name must be unique'})
  } else {
    const newPerson = new Person ({
      name: body.name, 
      number: body.number
    })
    newPerson.save()
      .then(person => {
        response.json(person)
      })
      .catch(err => {
        console.log('Fail saving new person', err.message)
      })
      .then(_ => mongoose.connection.close())
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
