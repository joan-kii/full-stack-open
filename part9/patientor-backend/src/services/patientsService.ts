import dataPatients from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const patients: Patient[] = dataPatients;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getNonSensitivePatients
};
