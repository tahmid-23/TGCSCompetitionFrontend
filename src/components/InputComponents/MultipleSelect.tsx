import { ChangeEvent } from 'react';

interface MultipleSelectProps {
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  name,
  value,
  onChange
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      ></input>
      <label htmlFor={name}>{value}</label>
    </>
  );
};

export default MultipleSelect;
