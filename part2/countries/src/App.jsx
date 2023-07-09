import { useState, useEffect } from "react"

import InputSearch from "./components/InputSearch"
import Results from "./components/Results"

import countriesService from './servicies/countries'

const App = () => {

  const [countryValue, setCountryValue] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const [matchesList, setMatchesList] = useState([])

  
  useEffect(() => {
    if (countryValue) {
      setMatchesList(countriesList.filter(item => {
        if (item.name.common.toLowerCase().includes(countryValue.toLowerCase())) {
          return item
        }
      }))
    }
  }, [countryValue])

  useEffect(() => {
    countriesService.getCountries()
      .then((response) => {
        setCountriesList(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleChange = (e) => {
    setCountryValue(e.target.value)
  }

  return (
    <>
      <InputSearch countryValue={countryValue} handleChange={handleChange} />
      <Results countryValue={countryValue} matchesList={matchesList} />
    </>
  )
}

export default App
