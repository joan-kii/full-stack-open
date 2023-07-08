import { useState, useEffect } from "react"

import InputSearch from "./components/InputSearch"
import Results from "./components/Results"

import countriesService from './servicies/countries'

const App = () => {

  const [country, setCountry] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const [matchesList, setMatchesList] = useState([])

  
  useEffect(() => {
    if (country) {
      setMatchesList(countriesList.filter(item => {
        if (item.name.common.toLowerCase().includes(country.toLowerCase())) {
          return item
        }
      }))
    }
  }, [country])

  useEffect(() => {
    countriesService.getCountries()
      .then((response) => {
        setCountriesList(response.data)
      })
  }, [])

  const handleChange = (e) => {
    setCountry(e.target.value)
  }

  return (
    <>
      <InputSearch country={country} handleChange={handleChange} />
      <Results matchesList={matchesList} />
    </>
  )
}

export default App
