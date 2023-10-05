import { v1 as uuid } from 'uuid';

import dataPatients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = dataPatients;

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getSinglePatient = (id: string): unknown => {
  return patients.find((patient) => patient.id === id);
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
  getPatients,
  getNonSensitivePatients,
  getSinglePatient,
  addPatient
};
