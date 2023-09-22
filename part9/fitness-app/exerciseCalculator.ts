interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number) : Results => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((day) => day > 0).length;
  const average = dailyExerciseHours.reduce((acc, day) => acc += day) / periodLength;
  const totalTarget = dailyExerciseHours.length * targetAmount;
  const totalHours = dailyExerciseHours.length * average;
  const difference = totalTarget - totalHours;
  
  let rating = 3;
  if (difference > 0 && difference < 1) rating = 2;
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
  }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
