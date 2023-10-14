import WorkIcon from '@mui/icons-material/Work';

import { OccupationalHealthcareEntry, Diagnosis } from '../../../types';
import { styles } from '../../../styles';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcare = ({ entry, diagnoses }: Props) => {
  return (
    <div style={ styles }>
      <WorkIcon />
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code: Diagnosis['code']) => {
          return diagnoses.map((diagnosis) => {
            if (diagnosis.code === code) {
              return <li key={code}>{code}: {diagnosis.name}</li>
            }
            return null;
          })
        })}
      </ul>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcare;
