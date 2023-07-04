const PersonForm = (props) => {

  return (
    <form onSubmit={props.addPerson}>
      <div>Name: <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div>Number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div><button type="submit">{props.buttonText}</button></div>
    </form>
  )
}

export default PersonForm
