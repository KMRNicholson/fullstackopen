import { NonSensitiveDiaryEntry } from "../types";

const Diary = (props: NonSensitiveDiaryEntry) => {
  return (
    <div>
      <h3>
        {props.date}
      </h3>
      <div>visibility: {props.visibility}</div>
      <div>weather: {props.weather}</div>
    </div>
  )
}

export default Diary;