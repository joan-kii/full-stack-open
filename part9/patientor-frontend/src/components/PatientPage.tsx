import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import { Diagnosis, Entry, Patient } from '../types';
import patientService from '../services/patients';

interface Props {
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses }: Props) => {
  const { userId } = useParams<string>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (userId) {
        const patientData = await patientService.getPatient(userId);
        setPatient(patientData);
      }
    };

    fetchPatient();
  }, [userId])
  
  return (
    <div>
      <h3>{patient?.name}
        {patient?.gender === 'male' && <MaleIcon />}
        {patient?.gender === 'female' && <FemaleIcon />}
        {patient?.gender === 'other' && <AltRouteIcon />}
      </h3>
      <p><b>S.S.N.:</b> {patient?.ssn}</p>
      <p><b>Occupation:</b> {patient?.occupation}</p>
      {patient && patient.entries.length > 0 && <h3>Entries</h3>}
      {patient?.entries.map((entry: Entry) => {
        return (
          <div key={entry.id}>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                return diagnoses.map((diagnosis) => {
                  if (diagnosis.code === code) {
                    return <li key={diagnosis.code}>{code} {diagnosis.name}</li>;
                  }

                  return null;
                })
              })}
            </ul>
          </div>
        )
      })}
    </div>
  );
};

export default PatientPage;
