import { useState, useEffect } from "react"

import weatherService from '../servicies/weather'

const Country = ({ country }) => {
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState('')
 
  useEffect(() => {
    weatherService.getWeather(country.capital[0])
      .then(response => {
        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
      })
      .catch(err => {
        console.log(err)
      })
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature {temp} Celsius</p>
        {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={`icon ${country.capital[0]} weather`} />}
        <p>Wind {wind} m/s</p>
      </div>
    </div>
  )
}

export default Country
