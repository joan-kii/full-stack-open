import { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';

import {
  Patient,
  Entry,
  EntryWithoutId,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Discharge,
  SickLeave,
  Diagnosis
} from '../../types';
import HealthCheckForm from './EntryFormTypes/HealthCheckForm';
import HospitalForm from './EntryFormTypes/HospitalForm';
import OccupationalHealthcareForm from './EntryFormTypes/OccupationalHealthcareForm';
import patientService from '../../services/patients';

interface Props {
  diagnoses: Diagnosis[],
  patient: Patient;
  updatePatient: (newEntry: Entry) => void;
}

const EntryForm = ({ diagnoses, patient, updatePatient }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodesList, setDiagnosisCodesList] = useState<string[]>([]);
  const [entryType, setEntryType] = useState('HealthCheck');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [discharge, setDischarge] = useState<Discharge>({ date: '', criteria: '' } as Discharge);
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({ startDate: '', endDate: '' } as SickLeave);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodesList
    } as EntryWithoutId;
    
    switch (entryType) {
      case 'HealthCheck':
        newEntry = newEntry as HealthCheckEntry;
        newEntry.type = 'HealthCheck' as HealthCheckEntry['type'];
        newEntry.healthCheckRating = Number(healthCheckRating);
        setHealthCheckRating('');
        break;
      case 'Hospital':
        newEntry = newEntry as HospitalEntry;
        newEntry.type = 'Hospital' as HospitalEntry['type'];
        newEntry.discharge = discharge;
        setDischarge({ date: '', criteria: '' } as Discharge);
        break;
      case 'OccupationalHealthcare':
        newEntry = newEntry as OccupationalHealthcareEntry;
        newEntry.type = 'OccupationalHealthcare' as OccupationalHealthcareEntry['type'];
        newEntry.employerName = employerName;
        newEntry.sickLeave = sickLeave;
        setEmployerName('');
        setSickLeave({ startDate: '', endDate: '' } as SickLeave);
        break;
      default:
        return newEntry;
    }
    
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
    setDiagnosisCodesList([]);
  };

  const handleDiagnosisCodes = (event: SelectChangeEvent<typeof diagnosisCodesList>) => {
    setDiagnosisCodesList(diagnosisCodesList.concat(event.target.value));
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ border: 'dotted', padding: '1rem' }}>
        <h3>New Entry</h3>
        <FormLabel>Entry Type</FormLabel>
        <RadioGroup
          row
          value={entryType}
          onChange={(event) => setEntryType(event.target.value)}
        >
          <FormControlLabel value="HealthCheck" control={<Radio />} label="Health Check" />
          <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
          <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational Healthcare" />
        </RadioGroup>
        <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Date"
            margin="dense"
            fullWidth
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
          <InputLabel id="diagnosisCodes">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosisCodes"
            id="diagnosisCodes"
            multiple
            fullWidth
            margin="dense"
            value={diagnosisCodesList}
            onChange={handleDiagnosisCodes}
          >
            {diagnoses.map((diagnoses) => {
              return (
                <MenuItem
                  key={diagnoses.code}
                  value={diagnoses.code}
                >
                  {diagnoses.code}
                </MenuItem>
              )
            })}
          </Select>
          {entryType === 'HealthCheck' &&
            <HealthCheckForm healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />
          }
          {entryType === 'Hospital' &&
            <HospitalForm discharge={discharge} setDischarge={setDischarge} />
          }
          {entryType === 'OccupationalHealthcare' &&
            <OccupationalHealthcareForm
              employerName={employerName}
              setEmployerName={setEmployerName}
              sickLeave={sickLeave}
              setSickLeave={setSickLeave}
            />
          }
          <Button
            sx={{ marginTop: '2rem' }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </form>
    </>
  );
};

export default EntryForm;
