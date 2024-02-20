import { Router } from "express";
import { calculateExercises } from "../services/exercisesService";
const exercisesRouter = Router();

exercisesRouter.post('/', (_req, res) => {
  if (!_req.body.daily_exercises || !_req.body.target) return res.status(400).json({error: 'parameters missing'});
  const { daily_exercises, target } = _req.body;

  const periodInput = daily_exercises as number[];

  try {
    let numberArray = true
    periodInput.forEach(dailyHours => isNaN(dailyHours) ? numberArray = false : numberArray)
    if (!numberArray) throw new TypeError();
  } catch (error) {
    if(error instanceof TypeError) return res.status(400).json({error: 'malformatted parameters'});
  }

  const targetInput = Number(target);

  if (isNaN(targetInput)) return res.status(400).json({error: 'malformatted parameters'});

  return res.status(200).send(calculateExercises(periodInput, targetInput));
});

export default exercisesRouter;