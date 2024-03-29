const bmiCategories: Record<string, number[]> = {
  "Underweight (Severe thinness)": [
    0.0,
    16.0
  ],
  "Underweight (Moderate thinness)": [
    16.0,
    17.0
  ],
  "Underweight (Mild thinness)": [
    17.0,
    18.5
  ],
  "Normal range": [
    18.5,
    25.0
  ],
  "Overweight (Pre-obese)": [
    25.0,
    30.0
  ],
  "Obese (Class I)": [
    30.0,
    35.0
  ],
  "Obese (Class II)": [
    35.0,
    40.0
  ],
  "Obese (Class III)": [
    40.0,
    100.0
  ],
};

const withinRange = (lower: number, upper: number, number: number): boolean => number >= lower && number < upper;

export const calculateBmi = (height: number, weight: number): string => {
  let result = `Could not determine BMI category based on weight ${weight} and height ${height}`;
  const bmi = weight / Math.pow(height / 100, 2);

  Object.keys(bmiCategories).forEach(category => {
    const lower = bmiCategories[category][0];
    const upper = bmiCategories[category][1];
    if (withinRange(lower, upper, bmi)) {
      result = category;
		}
  });

  return result;
};