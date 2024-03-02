import { Box, Typography } from '@mui/material';

import { Diagnosis } from "../../types";

interface Props {
  diagnosis : Diagnosis
}

const PatientDiagnosis = ({ diagnosis }: Props) => {
  return (
    <div className="App">
      <Box key={ diagnosis.code } style={{padding: 10}}>
        <Typography align="left" variant="body2">
          {diagnosis.code}: 
        </Typography>
        <Typography align="left" variant="body2">
          {diagnosis.name}
        </Typography>
      </Box>
    </div>
  );
};

export default PatientDiagnosis;
