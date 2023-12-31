import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import { Entry, Patient, Diagnosis } from '../../types';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import PatientDetails from './PatientDetails';
import EntryForm from './EntryForm';

const PatientPage = () => {
  const { userId } = useParams<string>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (userId) {
        const patientData = await patientService.getPatient(userId);
        setPatient(patientData);
      }
    };
    void fetchPatient();

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, [userId])

  const updatePatient = (newEntry: Entry): void => {
    const updatedEntries = patient?.entries.concat(newEntry);
    if (patient?.entries !== undefined) {
      setPatient({ ...patient, entries: updatedEntries as Entry[] });
    }
  };
  
  return (
    <div>
      <h3>{patient?.name}
        {patient?.gender === 'male' && <MaleIcon />}
        {patient?.gender === 'female' && <FemaleIcon />}
        {patient?.gender === 'other' && <AltRouteIcon />}
      </h3>
      <p><b>S.S.N.:</b> {patient?.ssn}</p>
      <p><b>Occupation:</b> {patient?.occupation}</p>
      {patient && <EntryForm diagnoses={diagnoses} patient={patient} updatePatient={updatePatient} />}
      {patient && patient.entries.length > 0 && <h3>Entries</h3>}
      {patient?.entries.map((entry: Entry) => {
        return (
          <PatientDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        )
      })}
    </div>
  );
};

export default PatientPage;
