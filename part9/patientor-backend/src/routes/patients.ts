import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Oops! Something went wrong.';
    if (error instanceof Error) {
      errorMessage = `${errorMessage} Error: ${error.message}`;
    }
    res.send(errorMessage);
  }
});

export default router;