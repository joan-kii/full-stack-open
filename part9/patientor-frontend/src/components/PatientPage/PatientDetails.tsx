import { Entry, Diagnosis } from '../../types';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcare from './OccupationalHealthcareEntry';
import HealthCheck from './HealthCheckEntry';
import { assertNever } from '../../helpers';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const PatientDetails = ({ entry, diagnoses }: Props) => {
  console.log(entry.type);
  
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default PatientDetails;
