import dataDiagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = dataDiagnoses;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
