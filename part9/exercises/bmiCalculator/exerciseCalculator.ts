interface ExerciseReport {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratings = [
  'bad',
  'okay',
  'good',
]

const calculateExercises = (dailyHours: number[], targetAverage: number): ExerciseReport => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const target = targetAverage;
  const totalHours = dailyHours.reduce((sum, hours) => sum += hours, 0)
  const average = totalHours / periodLength

  const ratio = target / average

  let rating = 1
  if (ratio <= 1) {
    rating = 3
  } else if (ratio <= target) {
    rating = 2
  }
  
  const success = rating === 3 ? true : false
  const ratingDescription = ratings[rating-1]

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))