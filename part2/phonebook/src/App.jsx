import { useState, useEffect } from 'react'

import Title from './components/Title'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      number: newNumber
    }

    const alreadyExists = persons.some(person => person.name === newPerson.name)

    if (alreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
  }

  const removePerson = (removedPerson) => {
    if (confirm(`Do you want to delete ${removedPerson.name}?`)) {
      personService.deletePerson(removedPerson.id)
        .then(response => {
          setPersons(persons.filter(person => {
            return person.id !== removedPerson.id
          }))
        })
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
      <Persons 
        searchName={searchName} 
        persons={persons} 
        filteredPersons={filteredPersons} 
        removePerson={removePerson}
      />
    </>
  )
}

export default App
