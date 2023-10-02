import { useState, useEffect } from 'react';

import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './services/diariyEntries';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries()
      .then((data) => {
        setDiaryEntries(data)
      })
  }, [])

  return (
    <div>
      <ul>
        {diaryEntries.map((diaryEntry) => {
          return <li key={diaryEntry.id}>{diaryEntry.weather}</li>
        })}
      </ul>
    </div>
  )
}

export default App
