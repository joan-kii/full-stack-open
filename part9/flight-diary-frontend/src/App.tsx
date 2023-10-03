import React, { useState, useEffect } from 'react';

import { DiaryEntry, Weather, Visibility } from './types';
import { getAllDiaryEntries, createEntry } from './services/diariyEntries';
import { Entry } from './components/Entry';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [dateEntry, setDateEntry] = useState('')
  const [visibilityEntry, setVisibilityEntry] = useState<Visibility | string>('')
  const [weatherEntry, setWeatherEntry] = useState<Weather| string>('')
  const [commentEntry, setCommentEntry] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getAllDiaryEntries()
      .then((data) => {
        setDiaryEntries(data)
      })
  }, [])

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
    setVisibilityEntry('')
    setWeatherEntry('')
    setCommentEntry('')
  }

  return (
    <div>
      <h1>Flight Diary</h1>
      <h4 style={{color: "red"}}>{error}</h4>
      <form onSubmit={handleSubmit}>
        Date:
        <input
          value={dateEntry}
          onChange={(event) => setDateEntry(event.target.value)}
        />
        <br/>
        Visibility:
        <input
          value={visibilityEntry}
          onChange={(event) => setVisibilityEntry(event.target.value)}
        />
        <br/>
        Weather:
        <input
          value={weatherEntry}
          onChange={(event) => setWeatherEntry(event.target.value)}
        />
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
