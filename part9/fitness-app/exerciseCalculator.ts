interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface BodyExerciseValues {
  targetAmount: number;
  dailyExerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): BodyExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  const validValues: BodyExerciseValues = {
    targetAmount: 0,
    dailyExerciseHours: [0]
  };
  
  if (!isNaN(Number(args[2]))) {
    validValues.targetAmount = Number(args[2]);
  } else {
    throw new Error('Provided target was not valid!');
  }

  if (args.slice(3).every((num) => !isNaN(Number(num)))) {
    validValues.dailyExerciseHours = args.slice(3).map((num) => Number(num));
  } else {
    throw new Error('Provided exercise hours were not valid!');
  }

  return validValues;
};

export const calculateExercises = (targetAmount: number, dailyExerciseHours: number[]) : Results => {  
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((day) => day > 0).length;
  const average = dailyExerciseHours.reduce((acc, day) => acc += day) / periodLength;
  const totalTarget = dailyExerciseHours.length * targetAmount;
  const totalHours = dailyExerciseHours.length * average;
  const difference = totalTarget - totalHours;
  
  let rating = 3;
  if (difference > 0 && difference <= 1) rating = 2;
  if (difference > 1) rating = 1;

  let ratingDescription = '';
  switch (rating) {
    case 1:
      ratingDescription = 'You need to improve your discipline.';
      break;
    case 2:
      ratingDescription = 'You can do it better.';
      break;
    default:
      ratingDescription = 'You got it!.';
  }

  return {
    periodLength,
    trainingDays,
    success:  difference <= 0 ? true : false,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  };
};

try {
  const { targetAmount, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(targetAmount, dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
