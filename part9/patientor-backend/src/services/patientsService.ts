import { v1 as uuid } from 'uuid';

import dataPatients from '../../data/patients';
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  EntryWithoutId
} from '../types';

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
    const patientId: string = uuid();
    const newPatient = {
      id: patientId,
      ...patient
    };
    dataPatients.push(newPatient);

    return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const entryId: string = uuid();
  const newEntryPatient = dataPatients.find((patient) => patient.id === patientId);
  const newEntry = {
    id: entryId,
    ...entry
  };
  newEntryPatient?.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getSinglePatient,
  addPatient,
  addEntry
};
