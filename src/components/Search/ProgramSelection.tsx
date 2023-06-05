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
        label={getProgramTypeDisplay(ProgramType.INTERN)}
        control={
          <Checkbox
            name="intern"
            value={ProgramType[ProgramType.INTERN]}
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
            onChange={onChange}
          />
        }
      />
    </>
  );
};

export default ProgramSelection;
