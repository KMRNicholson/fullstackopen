import { Box, Typography } from '@mui/material';
import { Female, Male, Transgender } from "@mui/icons-material";

import { Patient } from "../../types";

interface Props {
  patient : Patient
}

const PatientPage = ({ patient }: Props) => {
  
  const genders = {
    male: <Male />,
    female: <Female />,
    other: <Transgender />,
  };

  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h6">
          {patient.name} {genders[patient.gender]}
        </Typography>
      </Box>
      <Box>
        <Typography align="left" variant="body1">
          {patient.occupation}
        </Typography>
        <Typography align="left" variant="body2">
          {patient.dateOfBirth}
        </Typography>
      </Box>
    </div>
  );
};

export default PatientPage;
