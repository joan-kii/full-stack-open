const Persons = (props) => {
  const {
    searchName, persons, 
    filteredPersons , removePerson} = props

  return (
    <div>
      {searchName ? 
        persons.map(filteredPersons) : 
        persons.map(person => {
          return (
            <div key={person.id}>
              <p>{person.name} {person.number}</p>
              <button onClick={() => removePerson(person)}>Delete</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Persons
