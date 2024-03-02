import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const getPatient = (patientId: string): NonSensitivePatient => {
  const { id, name, dateOfBirth, gender, occupation, entries } = patients.filter(patient => patient.id === patientId)[0];
  
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  };
};

const addPatient = (newPatient: NewPatient): NonSensitivePatient => {
  const id = uuidv4();
  const addedPatient: NonSensitivePatient = {
    id,
    ...newPatient
  };

  return addedPatient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};