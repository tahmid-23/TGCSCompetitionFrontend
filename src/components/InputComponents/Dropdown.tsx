import { ChangeEvent } from 'react';

interface DropdownProps {
  name: string;
  id: string;
  items: string[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = (
  {
    name,
    id,
    items,
    onChange
  }: DropdownProps
) => {
  return (
    <>
      <select name={name} id={id} onChange={onChange}>
        {items.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <label htmlFor={id}>{name}</label>
    </>
  );
};
export default Dropdown;
