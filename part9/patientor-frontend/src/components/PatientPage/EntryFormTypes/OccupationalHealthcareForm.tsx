import { TextField } from '@mui/material';

import { SickLeave } from '../../../types';

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
}

const OccupationalHealthcareForm = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave
}: Props) => {
  return (
    <>
      <TextField
        label="Employer"
        fullWidth
        margin="normal"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        type="date"
        label="Start Date"
        fullWidth
        margin="normal"
        value={sickLeave.startDate}
        onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        type="date"
        label="End Date"
        fullWidth
        margin="normal"
        value={sickLeave.endDate}
        onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })}
      />
    </>
  )
};

export default OccupationalHealthcareForm;