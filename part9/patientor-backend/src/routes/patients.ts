import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, isString } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  console.log(patients);
  res.send(patients);
});

router.get('/:id', (_req, res) => {
  if (!_req.params.id || !isString(_req.params.id)) {
    res.status(400).send('Invalid id');
  }
  const id = `${_req.params.id}`;

  res.send(patientService.getPatient(id));
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