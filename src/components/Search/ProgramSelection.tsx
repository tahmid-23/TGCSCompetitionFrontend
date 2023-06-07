import { ChangeEvent, useCallback } from 'react';
import { ProgramType, getProgramTypeDisplay } from '../../api/model/program';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

interface ProgramSelectionProps {
  programTypes: ProgramType[];
  onProgramTypeChange?: (arg0: ProgramType[]) => void;
}

const ProgramSelection = ({
  programTypes,
  onProgramTypeChange: onFocusChange
}: ProgramSelectionProps) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newProgramTypes;

      if (e.currentTarget.checked) {
        newProgramTypes = programTypes.concat(
          ProgramType[e.currentTarget.value as keyof typeof ProgramType]
        );
      } else {
        newProgramTypes = programTypes.filter(
          (focus) =>
            focus !==
            ProgramType[e.currentTarget.value as keyof typeof ProgramType]
        );
      }

      onFocusChange?.(newProgramTypes);
    },
    [onFocusChange, programTypes]
  );
  return (
    <FormGroup row>
      <FormControlLabel
        label={getProgramTypeDisplay(ProgramType.INTERN)}
        control={
          <Checkbox
            name="intern"
            value={ProgramType[ProgramType.INTERN]}
            checked={programTypes.includes(ProgramType.INTERN)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getProgramTypeDisplay(ProgramType.PRESENTATION)}
        control={
          <Checkbox
            name="presentation"
            value={ProgramType[ProgramType.PRESENTATION]}
            checked={programTypes.includes(ProgramType.PRESENTATION)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getProgramTypeDisplay(ProgramType.RESEARCH)}
        control={
          <Checkbox
            name="research"
            value={ProgramType[ProgramType.RESEARCH]}
            checked={programTypes.includes(ProgramType.RESEARCH)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getProgramTypeDisplay(ProgramType.ACADEMIC)}
        control={
          <Checkbox
            name="academic"
            value={ProgramType[ProgramType.ACADEMIC]}
            checked={programTypes.includes(ProgramType.ACADEMIC)}
            onChange={onChange}
          />
        }
      />
    </FormGroup>
  );
};

export default ProgramSelection;
