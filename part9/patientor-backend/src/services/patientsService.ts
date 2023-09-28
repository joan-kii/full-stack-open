import { v1 as uuid } from 'uuid';

import dataPatients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

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

const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
      id,
      ...patient
    };
    dataPatients.push(newPatient);

    return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient
};
