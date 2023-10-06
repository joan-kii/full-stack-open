import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import { Patient } from '../types';
import patientService from '../services/patients';

const PatientPage = () => {
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
  console.log(patient);
  
  return (
    <div>
      <h3>{patient?.name}
        {patient?.gender === 'male' && <MaleIcon />}
        {patient?.gender === 'female' && <FemaleIcon />}
        {patient?.gender === 'other' && <AltRouteIcon />}
      </h3>
      <p><b>S.S.N.:</b> {patient?.ssn}</p>
      <p><b>Occupation:</b> {patient?.occupation}</p>
    </div>
  );
};

export default PatientPage;
