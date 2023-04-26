import { ChangeEvent } from 'react';

interface MultipleSelectProps {
  name: string;
  value: string;
  defaultChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MultipleSelect = ({
  name,
  value,
  defaultChecked: checked,
  onChange
}: MultipleSelectProps) => {
  return (
    <>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={checked}
      />
      <label htmlFor={name}>{value}</label>
    </>
  );
};

export default MultipleSelect;
