import express from 'express';
const app = express();

const bmiRouter = require("./controllers/bmi");

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.use('/bmi', bmiRouter);

module.exports = app;