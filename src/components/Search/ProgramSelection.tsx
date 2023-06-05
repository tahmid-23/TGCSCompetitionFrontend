import { ChangeEvent, useCallback, useState } from 'react';
import { ProgramType, getProgramTypeDisplay } from '../../api/model/program';
import { FormControlLabel, Checkbox } from '@mui/material';

interface ProgramSelectionProps {
  onProgramTypeChange?: (arg0: ProgramType[]) => void;
}

const ProgramSelection = ({
  onProgramTypeChange: onFocusChange
}: ProgramSelectionProps) => {
  const [focuses, setFocuses] = useState<ProgramType[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newFocuses;

      if (e.currentTarget.checked) {
        setFocuses(
          (newFocuses = focuses.concat(
            ProgramType[e.currentTarget.value as keyof typeof ProgramType]
          ))
        );
      } else {
        setFocuses(
          (newFocuses = focuses.filter(
            (focus) =>
              focus !==
              ProgramType[e.currentTarget.value as keyof typeof ProgramType]
          ))
        );
      }

      onFocusChange?.(newFocuses);
    },
    [onFocusChange, focuses]
  );
  return (
    <>
      <FormControlLabel
        name="intern"
        label={getProgramTypeDisplay(ProgramType.INTERN)}
        control={
          <Checkbox
            value={ProgramType[ProgramType.INTERN]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="academic"
        label={getProgramTypeDisplay(ProgramType.ACADEMIC)}
        control={
          <Checkbox
            value={ProgramType[ProgramType.ACADEMIC]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="presentation"
        label={getProgramTypeDisplay(ProgramType.PRESENTATION)}
        control={
          <Checkbox
            value={ProgramType[ProgramType.PRESENTATION]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="research"
        label={getProgramTypeDisplay(ProgramType.RESEARCH)}
        control={
          <Checkbox
            value={ProgramType[ProgramType.RESEARCH]}
            onChange={onChange}
          />
        }
      />
    </>
  );
};

export default ProgramSelection;
