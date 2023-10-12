export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface EntryBase {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends EntryBase {
  type: 'Hospital';
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends EntryBase {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

type HealthCheckEntryValues = Omit<HealthCheckEntry, 'id'>;
type HospitalEntryValues = Omit<HospitalEntry, 'id'>;
type OccupationalHealthcareEntryValues = Omit<OccupationalHealthcareEntry, 'id'>;

export type EntryFormValues = HealthCheckEntryValues | OccupationalHealthcareEntryValues | HospitalEntryValues;
