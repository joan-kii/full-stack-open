import { useState } from 'react';

import { Patient, Entry } from '../../types';
import HealthCheckForm from './EntryFormTypes/HealthCheckForm';

interface Props {
  patient: Patient;
  updatePatient: (newEntry: Entry) => void;
}

const EntryForm = ({ patient, updatePatient }: Props) => {
  return (
    <>
      {patient && <HealthCheckForm patient={patient} updatePatient={updatePatient} />}
    </>
  );
};

export default EntryForm;
