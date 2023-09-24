import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.send({ error: "malformatted parameters" });
  } else if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.send({ error: "malformatted parameters" });
  } else {
    res.send({
      ...req.query,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
  }
});

app.post('/exercises', (req, res) => {
  const { targetAmount, dailyExerciseHours } = req.body;
  if (!targetAmount || !dailyExerciseHours) {
    res.send({ error: "parameters missing" });
  } else if (isNaN(Number(targetAmount)) || !dailyExerciseHours.every((num: any) => !isNaN(Number(num)))) {
    res.send({ error: "malformatted parameters" });
  } else {
    res.send(calculateExercises(req.body.targetAmount, req.body.dailyExerciseHours)); 
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
