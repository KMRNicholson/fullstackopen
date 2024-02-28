import { useState } from "react";
import diaryService from "../services/diaryService";
import { NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from "../types";

interface NewDiaryProps {
  diaries: NonSensitiveDiaryEntry[],
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>,
}

const NewDiary = (props: NewDiaryProps) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState<string>('');

  const createDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    diaryService.addDiary(newDiary).then(diary => {
      const addedDiary = {
        id: diary.id,
        date: diary.date,
        weather: diary.weather,
        visibility: diary.visibility,
      };

      const newDiaries = props.diaries.concat(addedDiary);
      props.setDiaries(newDiaries);
    });
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={createDiary}>
        <div>
          <label htmlFor="date">date:</label>
          <input id="date" type="date" name="date" value={date} onChange={event => setDate(event.target.value)} />
        </div>
        <div>
          weather: {Object.values(Weather).map(v =>
            <div key={v} style={{display: 'inline'}}>
              <input type="radio" id={v} name='weather' value={v} onChange={() => setWeather(v)} />
              <label htmlFor={v}>{v}</label>
            </div>
          )}
        </div>
        <div>
          visibility: {Object.values(Visibility).map(v =>
            <div key={v} style={{display: 'inline'}}>
              <input type="radio" id={v} name='visibility' value={v} onChange={() => setVisibility(v)} />
              <label htmlFor={v}>{v}</label>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="comment">comment:</label>
          <input id="comment" type="text" name="comment" value={comment} onChange={event => setComment(event.target.value)} />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default NewDiary;
