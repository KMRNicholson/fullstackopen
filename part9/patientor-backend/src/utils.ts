import { NewPatient } from "./types"

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: object.name,
      dateOfBirth: object.dateOfBirth,
      gender: object.gender,
      occupation: object.occupation,
    };

    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};