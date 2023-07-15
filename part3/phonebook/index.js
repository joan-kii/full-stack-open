const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(people => {
      const res = `<div><p>Phonebook has info for ${people.length} people</p><p>${Date()}</p></div>`
      response.send(res)
    })
    .catch(err => next(err))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.send(people)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id
  Person.findById(personId)
    .then(person => {
      response.send(person)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id
  const number = request.body.number
  Person.findByIdAndUpdate(
    personId, 
    {number: number}, 
    {new: true, runValidators: true, context: 'query'}
  ).then(person => {
      response.send(person)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id
  Person.findByIdAndRemove(personId)
    .then(_ => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.find({})
    .then(people => {
        if (!body.name || !body.number) {
          response.status(400).json({error: 'content missing'})
        } else if (people.some(person => person.name === body.name)) {
          response.status(400).json({error: 'name must be unique'})
        } else {
          const newPerson = new Person ({
            name: body.name, 
            number: body.number
          })
          const numberValidation = newPerson.validateSync()
          if (!numberValidation) {
            newPerson.save()
              .then(person => {
                response.json(person)
              })
              .catch(err => next(err))
          } else {
            console.log(numberValidation);
            response.status(400).json({error: numberValidation.errors[0].message})
          }
        }
      }) 
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
