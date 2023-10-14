import {
  NewPatient,
  Gender,
  Entry,
  EntryType,
  Diagnosis,
  EntryWithoutId
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseField = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field.');
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map((v) => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseSsn = (ssn: unknown): string => {
  const re = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d[-|U-Y]|[012]\d[A-F])\d{2,3}[\dA-Z]$/;
  if (!ssn || !isString(ssn) || !re.test(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseEntry = (object: unknown): Entry[] => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  return object as Entry[];
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: unknown): number => {
  if (!rating || typeof Number(rating) !== 'number' || Number(rating) < 0 || Number(rating) > 3) {
    throw new Error(`Value of healthCheckRating incorrect: ${rating}`);
  }

  return Number(rating);
};

const parseType = (type: unknown): EntryType => {
  if (!type || typeof type !== 'string') {
    throw new Error(`Value of Entry Type incorrect: ${type}`);
  }

  return type as EntryType;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) { 
    const newPatient: NewPatient = {
      name: parseField(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseField(object.occupation),
      entries: parseEntry(object.entries)
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if ('date' in object && 'specialist' in object && 'description' in object && 'diagnosisCodes' in object && 'healthCheckRating' in object && 'type' in object) {
    const newEntry = {
      type: parseType(object.type),
      date: parseDate(object.date),
      specialist: parseField(object.specialist),
      description: parseField(object.description),
      diagnosisCodes: parseDiagnosisCodes(object),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };

    return newEntry as EntryWithoutId;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export {
  toNewPatient,
  toNewEntry
};