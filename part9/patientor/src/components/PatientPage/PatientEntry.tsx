import { Box, Typography } from '@mui/material';

import { Diagnosis, Entry } from "../../types";
import PatientDiagnosis from './PatientDiagnosis';

interface Props {
  entry : Entry
  diagnoses : Diagnosis[]
}

const PatientEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div className="App">
      <Box key={entry.id} style={{padding: 10}}>
        <Typography align="left" variant="body2">
          Date: {entry.date}
        </Typography>
        <Typography align="left" variant="body2">
          Description: {entry.description}
        </Typography>
        <Typography align="left" variant="h6" style={{paddingTop: 10}}>
          Codes:
        </Typography>
        {entry.diagnosisCodes?.map(code => {
          const diagnosis = diagnoses.filter(d => d.code === code)[0];
          return <PatientDiagnosis key={diagnosis.code} diagnosis={diagnosis} />;
        })}
      </Box>
    </div>
  );
};

export default PatientEntry;
