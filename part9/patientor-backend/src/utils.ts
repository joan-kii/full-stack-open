import {
  NewPatient,
  Gender,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  EntryType,
  Diagnosis,
  EntryWithoutId,
  Discharge,
  SickLeave
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

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error(`Value of discharge date or discharge criteria are incorrect: ${discharge}`);
  }

  return discharge as Discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error(`Value of Sick Leave start date or Sick Leave end date are incorrect: ${sickLeave}`);
  }

  return sickLeave as SickLeave;
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

  if ('date' in object && 
      'specialist' in object && 
      'description' in object && 
      'diagnosisCodes' in object && 
      'type' in object) {
    let newEntry = {
      type: parseType(object.type),
      date: parseDate(object.date),
      specialist: parseField(object.specialist),
      description: parseField(object.description),
      diagnosisCodes: parseDiagnosisCodes(object)
    } as EntryWithoutId;
    
    switch (object.type) {
      case 'HealthCheck':
        newEntry = newEntry as HealthCheckEntry;
        if ('healthCheckRating' in object) {
          newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
        }
        break;
      case 'Hospital':
        newEntry = newEntry as HospitalEntry;
        if ('discharge' in object) {
          newEntry.discharge = parseDischarge(object.discharge);
        }
        break;
      case 'OccupationalHealthcare':
        newEntry = newEntry as OccupationalHealthcareEntry;
        if ('employerName' in object && 'sickLeave' in object) {
          newEntry.employerName = parseField(object.employerName);
          newEntry.sickLeave = parseSickLeave(object.sickLeave);
        }
        break;
      default:
        return newEntry;
    }

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export {
  toNewPatient,
  toNewEntry
};