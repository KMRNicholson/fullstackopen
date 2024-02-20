import express from 'express';
const app = express();

import bmiRouter from './controllers/bmi';
import exercisesRouter from './controllers/exercises';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.use(express.json());

app.use('/bmi', bmiRouter);
app.use('/exercises', exercisesRouter);

export default app;