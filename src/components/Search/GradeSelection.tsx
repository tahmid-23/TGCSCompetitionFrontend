import { ChangeEvent, useCallback, useState } from 'react';
import { Grade } from '../../api/model/experience';
import { Checkbox, FormControlLabel } from '@mui/material';

interface GradeSelectionProps {
  checkedA?: boolean;
  checkedB?: boolean;
  checkedC?: boolean;
  checkedD?: boolean;
  onGradeChange?: (arg0: Grade[]) => void;
}

const GradeSelection = ({
  checkedA,
  checkedB,
  checkedC,
  checkedD,
  onGradeChange
}: GradeSelectionProps) => {
  const [grades, setGrades] = useState<Grade[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newGrades;
      if (e.currentTarget.checked) {
        setGrades(
          (newGrades = grades.concat(
            Grade[e.currentTarget.value as keyof typeof Grade]
          ))
        );
      } else {
        setGrades(
          (newGrades = grades.filter(
            (grade) =>
              grade !== Grade[e.currentTarget.value as keyof typeof Grade]
          ))
        );
      }

      onGradeChange?.(newGrades);
    },
    [onGradeChange, grades]
  );

  return (
    <>
      <FormControlLabel
        label="K-2"
        control={
          <Checkbox
            name="bucket1"
            value={Grade[Grade['K-2']]}
            defaultChecked={checkedA}
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
            defaultChecked={checkedB}
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
            defaultChecked={checkedC}
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
            defaultChecked={checkedD}
            onChange={onChange}
          />
        }
      />
    </>
  );
};

export default GradeSelection;
