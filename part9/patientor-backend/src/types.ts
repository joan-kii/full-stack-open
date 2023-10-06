export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
// Seguir aquí (types HospitalEntry y demás)
interface EntryBase {
  id: string;
  date: string;
  specialist: string;
  description: string;

}

export interface Entry {
  type: 'HealthCheck',
  healthCheckRating: 0,
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
