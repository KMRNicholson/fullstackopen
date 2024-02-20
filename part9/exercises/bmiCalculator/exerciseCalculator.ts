interface ExerciseReport {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseInput {
  period: number[],
  target: number
}

const ratings = [
  'bad',
  'okay',
  'good',
];

const calculateExercises = (dailyHours: number[], targetAverage: number): ExerciseReport => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const target = targetAverage;
  const totalHours = dailyHours.reduce((sum, hours) => sum += hours, 0);
  const average = totalHours / periodLength;

  const ratio = target / average;

  let rating = 1;
  if (ratio <= 1) {
    rating = 3;
  } else if (ratio <= target) {
    rating = 2;
  }
  
  const success = rating === 3 ? true : false;
  const ratingDescription = ratings[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseInput = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Too few arguments. Please enter hours for at least one day and target.');
  
  let period: number[] = [];
  let i = 2;

  const target = Number(args[i++]);
  if (isNaN(target)) throw new Error('Target hours must be specified as a number.');

  while (i < args.length) {
    const dailyHours = Number(args[i]);
    if (isNaN(dailyHours)) throw new Error('Daily hours in period must be specified as numbers.');
    period = [...period, dailyHours];
    i++;
  }

  return {
    period,
    target
  };
};

try {
  const { period, target } = parseExerciseInput(process.argv);
  console.log(calculateExercises(period, target));
} catch (error: unknown) {
  let errorMsg = 'Something bad happened';
  if (error instanceof Error) {
    errorMsg += `\nError: ${error.message}`;
  }

  console.log(errorMsg);
}