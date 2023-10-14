import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { HealthCheckEntry } from '../../../types';
import { styles, colours } from '../../../styles';

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: Props) => {
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
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default HealthCheck;
