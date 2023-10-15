import { TextField } from '@mui/material';

import { Discharge } from '../../../types';

interface Props {
  discharge: Discharge;
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
}

const HopitalForm = ({ discharge, setDischarge }: Props) => {
  return (
    <>
      <TextField
        label="Discharge Date"
        fullWidth
        margin="normal"
        value={discharge.date}
        onChange={({ target }) => setDischarge({ ...discharge, date: target.value })}
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        margin="normal"
        value={discharge.criteria}
        onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })}
      />
    </>
  )
};

export default HopitalForm;
