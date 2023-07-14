const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
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
    .catch(err => next(err))
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => {
      response.send(people)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response) => {
  const personId = request.params.id
  Person.findById(personId)
    .then(person => {
      response.send(person)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response) => {
  const personId = request.params.id
  Person.findByIdAndRemove(personId)
    .then(_ => {
      response.status(204).end()
    })
    .catch(err => next(err))
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
      .catch(err => next(err))
  }
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
