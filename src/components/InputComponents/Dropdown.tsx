import { ChangeEvent } from 'react';

interface DropdownProps<
  T extends string | ReadonlyArray<string> | number | undefined
> {
  name: string;
  id: string;
  items: T[];
  value?: T;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = <
  T extends string | ReadonlyArray<string> | number | undefined
>({
  name,
  id,
  items,
  value,
  onChange
}: DropdownProps<T>) => {
  return (
    <>
      <select name={name} id={id} defaultValue={value} onChange={onChange}>
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
