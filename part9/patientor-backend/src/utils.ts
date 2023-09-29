import { NewPatient, Gender } from "./types";

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

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseField(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseField(object.occupation)
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
