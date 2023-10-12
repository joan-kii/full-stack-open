import { Entry, Diagnosis } from '../../types';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';
import { assertNever } from '../../helpers';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const PatientDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default PatientDetails;
