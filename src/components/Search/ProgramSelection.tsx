import { ChangeEvent, useCallback, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';
import { ProgramType } from '../../api/model/program';

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
      <MultipleSelect
        name="intern"
        value={ProgramType[ProgramType.INTERN]}
        label="Internship"
        onChange={onChange}
      />
      <MultipleSelect
        name="academic"
        value={ProgramType[ProgramType.ACADEMIC]}
        label="Academic"
        onChange={onChange}
      />
      <MultipleSelect
        name="presentation"
        value={ProgramType[ProgramType.PRESENTATION]}
        label="Presentation"
        onChange={onChange}
      />
      <MultipleSelect
        name="research"
        value={ProgramType[ProgramType.RESEARCH]}
        label="Research"
        onChange={onChange}
      />
    </>
  );
};

export default ProgramSelection;
