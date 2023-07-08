const InputSearch = ({ country, handleChange }) => {
  return (
    <div>
      Find Countries: <input value={country} onChange={handleChange} />
    </div>
  )
}

export default InputSearch
