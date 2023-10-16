import { Select, MenuItem, InputLabel } from '@mui/material';

interface Props {
  healthCheckRating: string;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthCheckForm = ({ healthCheckRating, setHealthCheckRating }: Props) => {
  return (
    <>
      <InputLabel id="healthCheckRating">Health Check Rating</InputLabel>
      <Select
        labelId="healthCheckRating"
        id="healthCheckRating"
        fullWidth
        margin="dense"
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </Select>
    </>
  )
};

export default HealthCheckForm;
