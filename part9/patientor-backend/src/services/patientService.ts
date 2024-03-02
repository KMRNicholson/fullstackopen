import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (patientId: string): NonSensitivePatient => {
  const { id, name, dateOfBirth, gender, occupation } = patients.filter(patient => patient.id === patientId)[0];
  
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation
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