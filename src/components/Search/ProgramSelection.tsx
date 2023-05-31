import { ChangeEvent, useCallback, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';
import { Focus, ProgramType } from '../../api/model/program';

interface ProgramSelectionProps {
  onFocusChange?: (arg0: Focus[]) => void;
}

const ProgramSelection = ({ onFocusChange }: ProgramSelectionProps) => {
  const [focuses, setFocuses] = useState<Focus[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newFocuses;

      if (e.currentTarget.checked) {
        setFocuses(
          (newFocuses = focuses.concat(
            Focus[e.currentTarget.value as keyof typeof Focus]
          ))
        );
      } else {
        setFocuses(
          (newFocuses = focuses.filter(
            (focus) =>
              focus !== Focus[e.currentTarget.value as keyof typeof Focus]
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
