import { Gender, NewPatient } from "./types";

export const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String;

const isDoB = (dob: string): boolean => Boolean(Date.parse(dob));

const isGender = (gender: string): gender is Gender => Object.values(Gender).map(v => v.toString()).includes(gender);

const parseString = (string: unknown, propName: string): string => {
  if (!isString(string)) {
    throw new Error(`Incorrect value for ${propName}` );
  }

  return string;
};

const parseDoB = (dob: unknown): string => {
  if (!isString(dob) || !isDoB(dob)) {
    throw new Error('Incorrect date of birth');
  }

  return dob;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender value');
  }

  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDoB(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      ssn: parseString(object.ssn, 'ssn'),
      entries: [],
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};