const Country = ({ country }) => {
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
    </div>
  )
}

export default Country
