import { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import axios from 'axios';

import { Patient, Entry, HealthCheckEntry } from '../../../types';
import patientService from '../../../services/patients';

interface Props {
  patient: Patient;
  updatePatient: (newEntry: Entry) => void;
}

const HealthCheckForm = ({ patient, updatePatient }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodesList, setDiagnosisCodesList] = useState('');
  const [error, setError] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');

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
        updatePatient(entry);
      })
      .catch((err: Error) => {
        if (axios.isAxiosError(err)) {
          if (err?.response?.data && typeof err?.response?.data === "string") {
            const message = err.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", err);
          setError("Unknown error");
        }
      })

    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodesList('');
  };
  
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
            label="Diagnosis Codes"
            fullWidth
            margin="normal"
            value={diagnosisCodesList}
            onChange={({ target }) => setDiagnosisCodesList(target.value)}
          />
          <TextField
            label="Health Check Rating"
            fullWidth
            margin="normal"
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
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

export default HealthCheckForm;
