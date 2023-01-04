import { ChangeEvent } from 'react';

interface MultipleSelectProps {
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MultipleSelect = (
  {
    name,
    value,
    onChange
  }: MultipleSelectProps
) => {
  return (
    <>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name}>{value}</label>
    </>
  );
};

export default MultipleSelect;
