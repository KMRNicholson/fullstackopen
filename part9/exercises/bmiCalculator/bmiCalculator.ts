interface BMIInput {
  height: number;
  weight: number;
}

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

const calculateBmi = (height: number, weight: number): string => {
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

const parseArgs = (args: string[]): BMIInput => {
  if (args.length > 4) throw new Error('Too many arguments. Please enter only height and weight.');
  if (args.length < 4) throw new Error('Too few arguments. Please enter height and weight.');
  
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Either the specified height or weight was not a valid number. Try again.');
  } else {
    return {
      height,
      weight
    };
  }
};

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMsg = 'Something bad happened';
  if (error instanceof Error) {
    errorMsg += `\nError: ${error.message}`;
  }

  console.log(errorMsg);
}

