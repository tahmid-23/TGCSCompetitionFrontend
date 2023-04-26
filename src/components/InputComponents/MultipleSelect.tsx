import { ChangeEvent } from 'react';

interface MultipleSelectProps {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MultipleSelect = ({
  name,
  value,
  checked,
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
