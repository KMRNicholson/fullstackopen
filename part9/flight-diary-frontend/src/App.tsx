import { useEffect, useState } from "react"
import diaryService from "./services/diaryService"
import { NonSensitiveDiaryEntry } from "./types"
import Diary from "./components/Diary"

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  
  useEffect(() => {
    diaryService.getDiaries().then((data) => {
      setDiaries(data);
    })
  }, [])

  return (
    <>
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
