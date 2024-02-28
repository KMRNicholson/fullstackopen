import { useEffect, useState } from "react"
import axios from "axios"

import diaryService from "./services/diaryService"
import { NonSensitiveDiaryEntry } from "./types"
import Diary from "./components/Diary"
import NewDiary from "./components/NewDiary"

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    diaryService.getDiaries()
      .then(res => setDiaries(res.data))
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        } else {
          setError('Something went wrong.');
        }

        setTimeout(() => {
          setError('');
        }, 5000);
      });
  }, [])

  return (
    <>
      <div style={{ color: 'red' }}>{error}</div>
      <NewDiary diaries={diaries} setDiaries={setDiaries} />
      <h2>Diary Entries</h2>
      {diaries.map(diary =>
        <Diary
          key={diary.id}
          id={diary.id}
          date={diary.date}
          visibility={diary.visibility}
          weather={diary.weather}
        />
      )}
    </>
  )
}

export default App
