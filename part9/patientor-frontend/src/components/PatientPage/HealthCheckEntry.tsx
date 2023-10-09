import { Entry, Diagnosis } from '../../types';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HealthCheck = ({ entry, diagnoses }: Props) => {
  return (
    <div>
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
    </div>
  );
};

export default HealthCheck;