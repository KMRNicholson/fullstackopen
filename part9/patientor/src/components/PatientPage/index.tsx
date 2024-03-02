import { Box, Typography } from '@mui/material';
import { Female, Male, Transgender } from "@mui/icons-material";

import { Patient } from "../../types";
import PatientEntry from './PatientEntry';

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
      <Box style={{paddingTop: 10}}>
        <Typography align="left" variant="h4">
          {patient.name} {genders[patient.gender]}
        </Typography>
      </Box>
      <Box style={{paddingTop: 10}}>
        <Typography align="left" variant="body1">
          Occupation: {patient.occupation}
        </Typography>
        <Typography align="left" variant="body1">
          Date of Birth: {patient.dateOfBirth}
        </Typography>
      </Box>
      <Box style={{paddingTop: 10}}>
        <Typography align="left" variant="h5">
          Entries:
        </Typography>
        { patient.entries.map(entry => <PatientEntry key={entry.id} entry={entry} />) }
      </Box>
    </div>
  );
};

export default PatientPage;
