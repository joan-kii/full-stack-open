import { TextField } from '@mui/material';

interface Props {
  healthCheckRating: string;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({ healthCheckRating, setHealthCheckRating }: Props) => {
  return (
    <>
      <TextField
        label="Health Check Rating"
        fullWidth
        margin="normal"
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
      />
    </>
  )
};

export default OccupationalHealthcareForm;