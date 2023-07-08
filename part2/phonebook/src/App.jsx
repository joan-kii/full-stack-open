import { useState, useEffect } from 'react'

import Title from './components/Title'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [isError, setIsError] = useState(false)
 
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
    let currentId = 0
    let alreadyExists = false
    let isUpdatingNumber = false

    persons.forEach(person => {
      if (person.name === newPerson.name && person.number === newPerson.number) {
        alreadyExists = true
      } else if ((person.name === newPerson.name && person.number !== newPerson.number)) {
        isUpdatingNumber = true
        currentId = person.id
      }
    })

    if (alreadyExists) {
      setIsError(prevError => !prevError)
      setErrorMessage(`${newName} is already added to the phonebook`)
      setTimeout(() => {
        setIsError(prevError => !prevError)
        setErrorMessage('')
      }, 5000)
    } else if (isUpdatingNumber) {
      if (confirm(`${newName} is already added to the phonebook. Replace old number with a new one?`)) {
        personService.update(currentId, newPerson)
          .then(response => {
            setPersons(persons.map(person => {
              return person.id === response.data.id ? response.data : person
            }))
            setInfoMessage(`Updated ${response.data.name}`)
            setTimeout(() => {
              setInfoMessage('')
            }, 5000)
          })
          .catch(() => {
            setIsError(prevError => !prevError)
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter(person => person.name !== newName))
            setTimeout(() => {
              setIsError(prevError => !prevError)
              setErrorMessage('')
            }, 5000)
          })
        }
      } else {
        personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setInfoMessage(`Added ${response.data.name}`)
          setTimeout(() => {
            setInfoMessage('')
          }, 5000)
        })
      }
    }

  const deletePerson = (personToRemove) => {
    if (confirm(`Do you want to delete ${personToRemove.name}?`)) {
      personService.deletePerson(personToRemove.id)
        .then(() => {
          setPersons(persons.filter(person => {
            return person.id !== personToRemove.id
          }))
          setInfoMessage(`Deleted ${personToRemove.name}`)
          setTimeout(() => {
            setInfoMessage('')
          }, 5000)
        })
    }
  }

  return (
    <>
      <Title text='Phonebook' />
      {errorMessage && <Notification message={errorMessage} isError={isError} />}
      {infoMessage && <Notification message={infoMessage} isError={isError} />}
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
        deletePerson={deletePerson}
      />
    </>
  )
}

export default App
