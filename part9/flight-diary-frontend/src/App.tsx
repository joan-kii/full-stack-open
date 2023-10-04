import React, { useState, useEffect } from 'react';

import { DiaryEntry, Weather, Visibility } from './types';
import { getAllDiaryEntries, createEntry } from './services/diariyEntries';
import { Entry } from './components/Entry';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [dateEntry, setDateEntry] = useState('2023-10-01')
  const [visibilityEntry, setVisibilityEntry] = useState<Visibility>('good')
  const [weatherEntry, setWeatherEntry] = useState<Weather>('sunny')
  const [commentEntry, setCommentEntry] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getAllDiaryEntries()
      .then((data) => {
        setDiaryEntries(data)
      })
  }, [])

  const onVisibilityChange = (visibility: Visibility) => {
    setVisibilityEntry(visibility)
  }

  const onWeatherChange = (weather: Weather) => {
    setWeatherEntry(weather)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entryToAdd = {
      id: diaryEntries.length + 1,
      date: dateEntry,
      visibility: visibilityEntry,
      weather: weatherEntry,
      comment: commentEntry 
    }

    createEntry(entryToAdd)
      .then((entry) => {
        setDiaryEntries(diaryEntries.concat(entry))
      })
      .catch((err) => {
        setError(err.response.data)
      })

    setDateEntry('')
    setVisibilityEntry('good')
    setWeatherEntry('sunny')
    setCommentEntry('')
  }

  return (
    <div>
      <h1>Flight Diary</h1>
      <h4 style={{ color: "red" }}>{error}</h4>
      <form onSubmit={handleSubmit}>
        Date:
        <input
          type="date"
          value={dateEntry}
          min="2023-10-01"
          onChange={(event) => setDateEntry(event.target.value)}
        />
        <br/>
        <fieldset style={{ width: "20%" }}>
          <legend>Select Visibility</legend>
          <div>
            <input
              type="radio"
              name="visibility"
              checked={visibilityEntry === 'good'}
              value="good"
              onChange={() => onVisibilityChange('good')}
            />
            <label htmlFor="visibility">Good</label>
          </div>
          <div>
            <input
              type="radio"
              name="visibility"
              checked={visibilityEntry === 'poor'}
              value="poor"
              onChange={() => onVisibilityChange('poor')}
            />
            <label htmlFor="visibility">Poor</label>
          </div>
          <div>
            <input
              type="radio"
              name="visibility"
              checked={visibilityEntry === 'ok'}
              value="ok"
              onChange={() => onVisibilityChange('ok')}
            />
            <label htmlFor="visibility">OK</label>
          </div>
          <div>
            <input
              type="radio"
              name="visibility"
              checked={visibilityEntry === 'great'}
              value="great"
              onChange={() =>  onVisibilityChange('great')}
            />
            <label htmlFor="visibility">Great</label>
          </div>
        </fieldset>
        <br/>
        <fieldset style={{ width: "20%" }}>
          <legend>Select Weather</legend>
          <div>
            <input
              type="radio"
              name="weather"
              checked={weatherEntry === 'sunny'}
              value="sunny"
              onChange={() => onWeatherChange('sunny')}
            />
            <label htmlFor="weather">Sunny</label>
          </div>
          <div>
            <input
              type="radio"
              name="weather"
              checked={weatherEntry === 'rainy'}
              value="rainy"
              onChange={() => onWeatherChange('rainy')}
            />
            <label htmlFor="weather">Rainy</label>
          </div>
          <div>
            <input
              type="radio"
              name="weather"
              checked={weatherEntry === 'cloudy'}
              value="cloudy"
              onChange={() => onWeatherChange('cloudy')}
            />
            <label htmlFor="weather">Cloudy</label>
          </div>
          <div>
            <input
              type="radio"
              name="weather"
              checked={weatherEntry === 'windy'}
              value="windy"
              onChange={() => onWeatherChange('windy')}
            />
            <label htmlFor="weather">Windy</label>
          </div>
          <div>
            <input
              type="radio"
              name="weather"
              checked={weatherEntry === 'stormy'}
              value="stormy"
              onChange={() => onWeatherChange('stormy')}
            />
            <label htmlFor="weather">Stormy</label>
          </div>
        </fieldset>
        <br/>
        Comment:
        <input
          value={commentEntry}
          onChange={(event) => setCommentEntry(event.target.value)}
        />
        <br/>
        <button type="submit">Add Entry</button>
      </form>
      <h2>Diary Entries</h2>
      {diaryEntries.map((diaryEntry) => {
        return <Entry key={diaryEntry.id} {...diaryEntry} />
      })}
    </div>
  )
}

export default App
