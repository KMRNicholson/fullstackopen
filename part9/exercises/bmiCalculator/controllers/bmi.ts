import { Router } from "express";
import { calculateBmi } from "../services/bmiService";
const bmiRouter = Router();

bmiRouter.get('/', (_req, res) => {
  const { height, weight } = _req.query;
  const heightInput = Number(height);
  const weightInput = Number(weight);

  if (isNaN(heightInput) || isNaN(weightInput)) res.status(400).send('malformatted parameters');

  res.status(200).send(calculateBmi(heightInput, weightInput));
});

module.exports = bmiRouter;