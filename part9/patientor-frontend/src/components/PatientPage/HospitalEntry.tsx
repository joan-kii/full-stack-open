import { Entry, Diagnosis } from '../../types';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const styles = {
  border: 'solid black 1px',
  borderRadius: '10px',
  marginBottom: '1rem',
  padding: '.5rem'
};

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div style={ styles }>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
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

export default HospitalEntry;
