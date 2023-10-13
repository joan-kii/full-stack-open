import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';

import { Patient, Entry, HealthCheckEntry } from '../../types';
import patientService from '../../services/patients';

interface Props {
  patient: Patient;
}

const EntryForm = ({ patient }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodesList, setDiagnosisCodesList] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      type: 'HealthCheck' as HealthCheckEntry['type'],
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodesList.split(', ')
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
    setHealthCheckRating('');
    setDiagnosisCodesList('');
  };
  console.log(patient);
  
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ border: 'dotted', padding: '1rem' }}>
        <h3>New HealthCheck Entry</h3>
        <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            fullWidth 
            margin="normal"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            margin="normal"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="Health Check Rating"
            fullWidth
            margin="normal"
            value={healthCheckRating}
            defaultValue=""
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
          <TextField
            label="Diagnosis Codes"
            fullWidth
            margin="normal"
            value={diagnosisCodesList}
            onChange={({ target }) => setDiagnosisCodesList(target.value)}
          />
          <Button
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </form>
    </>
  )
};

export default EntryForm;
