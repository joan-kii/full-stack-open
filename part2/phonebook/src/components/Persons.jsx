const Persons = (props) => {
  const {searchName, persons, filteredPersons} = props

  return (
    <div>
      {searchName ? 
        persons.map(filteredPersons) : 
        persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default Persons
