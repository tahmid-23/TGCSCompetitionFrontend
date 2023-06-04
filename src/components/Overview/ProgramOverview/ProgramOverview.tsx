import { Typography } from '@mui/material';
import { Program } from '../../../api/model/program';

export interface ProgramOverviewProps {
  program: Program;
}

const ProgramOverview = ({ program }: ProgramOverviewProps) => {
  return (
    <>
      <div>
        <Typography>Program Type: {program.program_type}</Typography>
      </div>
      <div>
        <Typography>Monthly Fee: ${program.monthly_fee}</Typography>
      </div>
      <div>
        <Typography>
          Focuses:{' '}
          {program.program_focuses.map((focus) => focus.focus).join(', ')}
        </Typography>
      </div>
      <div>
        <Typography>Time commitment: {program.time_commitment}</Typography>
      </div>
    </>
  );
};

export default ProgramOverview;
