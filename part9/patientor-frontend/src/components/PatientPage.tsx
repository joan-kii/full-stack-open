import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Patient } from '../types';
import patientService from '../services/patients';

type PatientId = {
  userId: string;
}

const PatientPage = () => {
  const { userId } = useParams<PatientId>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patientData = await patientService.getPatient(userId);
      setPatient(patientData);
    };

    fetchPatient();
  }, [userId])

  return (
    <div>{patient && patient.name}</div>
  );
};

export default PatientPage;
