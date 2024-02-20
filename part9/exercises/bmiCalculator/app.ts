import express from 'express';
const app = express();

import bmiRouter from './controllers/bmi';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.use('/bmi', bmiRouter);

export default app;