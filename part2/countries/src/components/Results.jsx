import Country from "./Country"

const Results = ({ matchesList }) => {
  return (
    <div>
      {matchesList.length > 10 && <p>Too many matches, specify another filter</p>}
      {matchesList.length < 10 && matchesList.length > 1 && 
        matchesList.map(item => <p key={item.name.common}>{item.name.common}</p>)}
      {matchesList.length === 1 && <Country country={matchesList[0]} />}
    </div>
  )
}

export default Results
