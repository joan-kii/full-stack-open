import { useState } from 'react'

import Title from './components/Title'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchName(e.target.value)
  }

  const filteredPersons = (person) => {
    if (person.name.toLowerCase().startsWith(searchName.toLowerCase())) {
      return <p key={person.id}>{person.name} {person.number}</p>
    }
  }

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const alreadyExists = persons.some(person => person.name === newPerson.name)

    if (alreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
  }

  return (
    <>
      <Title text='Phonebook' />
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <Title text='Add new Person' />
      <PersonForm buttonText='Add' addPerson={addPerson} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <Title text='Numbers' />
      <Persons searchName={searchName} persons={persons} filteredPersons={filteredPersons} />
    </>
  )
}

export default App
