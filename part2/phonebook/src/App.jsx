import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    console.log(JSON.stringify(newPerson));

    const alreadyExists = persons.includes(person => {
      console.log(JSON.stringify(person));
      console.log(JSON.stringify(newPerson));
      JSON.stringify(person) === JSON.stringify(newPerson)
    })
    console.log(alreadyExists);

    if (alreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} onChange={handleNameChange} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App
