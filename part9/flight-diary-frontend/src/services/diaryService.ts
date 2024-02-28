import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
const baseUrl = "http://localhost:3000/api/diaries";

const getDiaries = () =>
  axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);

const addDiary = (newDiary: NewDiaryEntry) =>
  axios
    .post<DiaryEntry>(baseUrl, newDiary)
    .then(response => response.data);

export default {
  getDiaries,
  addDiary,
}
