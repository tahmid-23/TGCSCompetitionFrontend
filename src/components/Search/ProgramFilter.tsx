import { ChangeEvent, useCallback, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';

interface ProgramFilterProps {
  onFocusChange?: (arg0: string[]) => void;
}

const ProgramFilter = ({ onFocusChange }: ProgramFilterProps) => {
  const [focuses, setFocuses] = useState<string[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newFocuses;

      if (e.currentTarget.checked) {
        setFocuses((newFocuses = focuses.concat(e.currentTarget.value)));
      } else {
        setFocuses(
          (newFocuses = focuses.filter(
            (focus) => focus !== e.currentTarget.value
          ))
        );
      }

      onFocusChange?.(newFocuses);
    },
    [onFocusChange, focuses]
  );
  return (
    <>
      <MultipleSelect name="intern" value="Internship" onChange={onChange} />
      <MultipleSelect name="academic" value="Academic" onChange={onChange} />
      <MultipleSelect
        name="presentation"
        value="Presentation"
        onChange={onChange}
      />
      <MultipleSelect name="research" value="Research" onChange={onChange} />
    </>
  );
};

export default ProgramFilter;
