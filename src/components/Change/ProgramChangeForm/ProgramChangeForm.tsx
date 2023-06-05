import { FormEventHandler } from 'react';
import {
  Focus,
  Program,
  ProgramType,
  getFocusDisplay,
  getProgramTypeDisplay
} from '../../../api/model/program';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material';

interface ProgramAddFormProps {
  program?: Program;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const ProgramChangeForm = ({ program, onSubmit }: ProgramAddFormProps) => {
  let defaultProgramTypeValue;
  switch (program?.program_type) {
    case ProgramType.INTERN:
      defaultProgramTypeValue = ProgramType[ProgramType.INTERN];
      break;
    case ProgramType.PRESENTATION:
      defaultProgramTypeValue = ProgramType[ProgramType.PRESENTATION];
      break;
    case ProgramType.RESEARCH:
      defaultProgramTypeValue = ProgramType[ProgramType.RESEARCH];
      break;
    case ProgramType.ACADEMIC:
      defaultProgramTypeValue = ProgramType[ProgramType.ACADEMIC];
      break;
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack sx={{ alignItems: 'flex-start' }} spacing={1}>
        <RadioGroup name="Type" defaultValue={defaultProgramTypeValue} row>
          <FormControlLabel
            control={
              <Radio
                value={ProgramType[ProgramType.INTERN]}
                defaultChecked={program?.program_type === ProgramType.INTERN}
                required
              />
            }
            label={getProgramTypeDisplay(ProgramType.INTERN)}
          />
          <FormControlLabel
            control={
              <Radio
                value={ProgramType[ProgramType.PRESENTATION]}
                defaultChecked={
                  program?.program_type === ProgramType.PRESENTATION
                }
                required
              />
            }
            label={getProgramTypeDisplay(ProgramType.PRESENTATION)}
          />
          <FormControlLabel
            control={
              <Radio
                value={ProgramType[ProgramType.RESEARCH]}
                defaultChecked={program?.program_type === ProgramType.RESEARCH}
                required
              />
            }
            label={getProgramTypeDisplay(ProgramType.RESEARCH)}
          />
          <FormControlLabel
            control={
              <Radio
                value={ProgramType[ProgramType.ACADEMIC]}
                defaultChecked={program?.program_type === ProgramType.ACADEMIC}
                required
              />
            }
            label={getProgramTypeDisplay(ProgramType.ACADEMIC)}
          />
        </RadioGroup>

        <FormControlLabel
          control={
            <Checkbox
              name="theoretical_checkbox"
              value={Focus[Focus.THEORETICAL]}
              defaultChecked={
                program?.program_focuses.find(
                  (focus) => focus.focus === Focus.THEORETICAL
                ) !== undefined
              }
            />
          }
          label={getFocusDisplay(Focus.THEORETICAL)}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="practical_checkbox"
              value={Focus[Focus.PRACTICAL]}
              defaultChecked={
                program?.program_focuses.find(
                  (focus) => focus.focus === Focus.PRACTICAL
                ) !== undefined
              }
            />
          }
          label={getFocusDisplay(Focus.PRACTICAL)}
        />
        <TextField
          id="monthly_fee"
          label="Monthly Fee"
          variant="standard"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          defaultValue={program?.time_commitment}
          required
        />
        <TextField
          id="time_commitment"
          label="Time Commitment"
          variant="standard"
          type="number"
          defaultValue={program?.time_commitment}
          required
        />
        <Button type="submit" variant="contained">
          Finish
        </Button>
      </Stack>
    </form>
  );
};

export default ProgramChangeForm;
