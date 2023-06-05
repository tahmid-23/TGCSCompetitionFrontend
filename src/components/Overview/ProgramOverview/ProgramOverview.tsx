import { Typography } from '@mui/material';
import {
  Program,
  getFocusDisplay,
  getProgramTypeDisplay
} from '../../../api/model/program';

export interface ProgramOverviewProps {
  program?: Program;
}

const ProgramOverview = ({ program }: ProgramOverviewProps) => {
  return (
    <>
      {program?.program_type && (
        <div>
          <Typography>
            Program Type: {getProgramTypeDisplay(program.program_type)}
          </Typography>
        </div>
      )}
      {program?.monthly_fee && (
        <div>
          <Typography>Monthly Fee: ${program.monthly_fee}</Typography>
        </div>
      )}
      {program?.program_focuses && program.program_focuses.length !== 0 && (
        <div>
          <Typography>
            Focuses:{' '}
            {program.program_focuses
              .map((focus) => getFocusDisplay(focus.focus))
              .join(', ')}
          </Typography>
        </div>
      )}
      {program?.time_commitment && (
        <div>
          <Typography>Time commitment: {program.time_commitment}</Typography>
        </div>
      )}
    </>
  );
};

export default ProgramOverview;
