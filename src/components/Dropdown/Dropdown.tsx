import { ChangeEvent } from 'react';

interface DropdownProps {
  name: string;
  id: string;
  items: string[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, id, items, onChange }) => {
  return (
    <select name={name} id={id} onChange={onChange}>
      {items.map((item) => {
        return <option value={item}>{item}</option>;
      })}
    </select>
  );
};
export default Dropdown;
