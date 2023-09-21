const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);

  switch (true) {
    case (bmi < 16.0):
      return 'Underweight (Server thinness)';
    case (bmi > 16.0 && bmi < 16.9):
      return 'Underweight (Moderate thinness)';
    case (bmi > 17.0 && bmi < 18.4):
      return 'Underweight (Mild thinness)';
    case (bmi > 18.5 && bmi < 24.9):
      return 'Normal range (Healthy weight)';
    case (bmi > 25.0 && bmi < 29.9):
      return 'Overweight (Pre-obese)';
    case (bmi > 30.0 && bmi < 34.9):
      return 'Obese (Class I)';
    case (bmi > 35.0 && bmi < 39.9):
      return 'Obese (Class II)';
    default:
      return 'Obese (Class III)';
  }
};

console.log((calculateBmi(180, 74)));
