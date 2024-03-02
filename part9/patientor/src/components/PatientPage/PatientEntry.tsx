import { Box, Typography } from '@mui/material';

import { Entry } from "../../types";
import PatientDiagnosis from './PatientDiagnosis';

interface Props {
  entry : Entry
}

const PatientEntry = ({ entry }: Props) => {
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
        { entry.diagnosisCodes?.map(code => <PatientDiagnosis key={code} diagnosis={{ code, name: '' }} />) }
      </Box>
    </div>
  );
};

export default PatientEntry;
