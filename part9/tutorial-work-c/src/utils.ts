import { NewDiaryEntry, Visibility, Weather } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (weather: string): weather is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(weather);
};

const isVisibility = (visibility: string): visibility is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(visibility);
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect of missing weather');
  }

  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect of missing visibility');
  }

  return visibility;
};

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
    const newEntry: NewDiaryEntry = {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};