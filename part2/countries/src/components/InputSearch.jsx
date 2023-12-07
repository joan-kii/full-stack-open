const InputSearch = ({ countryValue, handleChange }) => {
  return (
    <div>
      Find Countries: <input value={countryValue} onChange={handleChange} />
    </div>
  )
}

export default InputSearch
