import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { HospitalEntry, Diagnosis } from '../../../types';
import { styles } from '../../../styles';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const Hospital = ({ entry, diagnoses }: Props) => {
  return (
    <div style={ styles }>
      <LocalHospitalIcon />
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
      <h4>Discharge: </h4>
      <p>{entry.discharge.date} - {entry.discharge.criteria}</p>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default Hospital;
