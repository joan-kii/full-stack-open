import React, { useState } from 'react';

import { Patient, Entry, HealthCheckEntry } from '../../types';
import patientService from '../../services/patients';

interface Props {
  patient: Patient;
}

const EntryForm = ({ patient }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  /* const [diagnosisCodes, setDiagnosisCodes] = useState([]); */
  const [error, setError] = useState('');

  const onDescriptionChange = (description: string) => {
    setDescription(description);
  };

  const onDateChange = (date: string) => {
    setDate(date);
  };

  const onSpecialistChange = (specialist: string) => {
    setSpecialist(specialist);
  };

  const onHealthCheckRatingChange = (healthRating: string) => {
    setHealthCheckRating(Number(healthRating));
  };

  /* const onDiagnosisCodeChange = (diagnosisCode: string) => {
    setDiagnosisCodes(diagnosisCodes.push(diagnosisCode));
  }; */

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      type: 'HealthCheck' as HealthCheckEntry['type'],
      description,
      date,
      specialist,
      healthCheckRating,
      /* diagnosisCodes */
    };

    patientService.createEntry(newEntry, patient.id)
      .then((entry: Entry) => {
        patient.entries.push(entry);
      })
      .catch((err: Error) => {
        setError(err.message);
      })

    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(0);
    /* setDiagnosisCodes([]); */
  };

  return (
    <>
      <h3>New HealthCheck Entry</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} style={{ border: 'dot' }}>
      </form>
    </>
  )
};

export default EntryForm;
