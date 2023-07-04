const Filter = (props) => {
  const {searchName, handleSearchChange} = props
  return (
    <div>
      Filter shown with: <input value={searchName} onChange={handleSearchChange} />
    </div>
  )
}

export default Filter
