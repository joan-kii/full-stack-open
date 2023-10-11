import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { HealthCheckEntry, Diagnosis } from '../../types';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const styles = {
  border: 'solid black 1px',
  borderRadius: '10px',
  marginBottom: '1rem',
  padding: '.5rem'
};

const colours = {
  good: 'green',
  medium: 'yellow',
  bad: 'orange',
  alert: 'red'
};

const HealthCheck = ({ entry, diagnoses }: Props) => {
  let healthRating = colours.good;
  switch (entry.healthCheckRating) {
    case 1:
      healthRating = colours.medium;
      break;
    case 2: 
      healthRating = colours.bad;
      break;
    case 3:
      healthRating = colours.alert;
      break;
    default: 
      healthRating = colours.good;
  }
  
  return (
    <div style={ styles }>
      <MedicalServicesIcon />
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <FavoriteIcon sx={{ color: healthRating }} />
      <ul>
        {entry.diagnosisCodes?.map((code: Diagnosis['code']) => {
          return diagnoses.map((diagnosis) => {
            if (diagnosis.code === code) {
              <p>{code}</p>
            }

            return null;
          })
        })}
      </ul>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default HealthCheck;