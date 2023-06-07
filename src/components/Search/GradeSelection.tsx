import { ChangeEvent, useCallback } from 'react';
import { Grade } from '../../api/model/experience';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

interface GradeSelectionProps {
  grades: Grade[];
  onGradeChange?: (arg0: Grade[]) => void;
}

const GradeSelection = ({ grades, onGradeChange }: GradeSelectionProps) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newGrades;
      if (e.currentTarget.checked) {
        newGrades = grades.concat(
          Grade[e.currentTarget.value as keyof typeof Grade]
        );
      } else {
        newGrades = grades.filter(
          (grade) =>
            grade !== Grade[e.currentTarget.value as keyof typeof Grade]
        );
      }

      onGradeChange?.(newGrades);
    },
    [onGradeChange, grades]
  );

  return (
    <FormGroup row>
      <FormControlLabel
        label="K-2"
        control={
          <Checkbox
            name="bucket1"
            value={Grade[Grade['K-2']]}
            checked={grades.includes(Grade['K-2'])}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label="3-5"
        control={
          <Checkbox
            name="bucket2"
            value={Grade[Grade['3-5']]}
            checked={grades.includes(Grade['3-5'])}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label="6-8"
        control={
          <Checkbox
            name="bucket3"
            value={Grade[Grade['6-8']]}
            checked={grades.includes(Grade['6-8'])}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label="9-12"
        control={
          <Checkbox
            name="bucket4"
            value={Grade[Grade['9-12']]}
            checked={grades.includes(Grade['9-12'])}
            onChange={onChange}
          />
        }
      />
    </FormGroup>
  );
};

export default GradeSelection;
