import { useState, useEffect } from "react"

import Country from "./Country"

const Results = ({ countryValue, matchesList }) => {

  const [selectedCountry, setselectedCountry] = useState(null)

  useEffect(() => {
    setselectedCountry(null)
  }, [countryValue])
  

  return (
    <div>
      {!selectedCountry && matchesList.length > 10 && <p>Too many matches, specify another filter</p>}
      {!selectedCountry && matchesList.length === 0 && <p>No country found with this filter</p>}
      {!selectedCountry && matchesList.length < 10 && matchesList.length > 1 && 
        matchesList.map(item => {
          return (
            <div key={item.name.common}>
              <p>{item.name.common} </p><button onClick={() => setselectedCountry(item)}>Show</button>
            </div>
          )
        })
      }
      {matchesList.length === 1 && <Country country={matchesList[0]} />}
      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  )
}

export default Results
