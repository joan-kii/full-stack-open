import axios from "axios";
import {
  Patient,
  PatientFormValues,
  EntryFormValues,
  EntryWithoutId,
  Entry
} from '../types';

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: EntryFormValues, patientId: string) => {
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data as Entry;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getPatient,
  createPatient,
  createEntry
};

