import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps<
  T extends string | ReadonlyArray<string> | number | undefined
> {
  id: string;
  label: string;
  items: T[];
  defaultChoice?: T;
  onChange?: (e: SelectChangeEvent<T>) => void;
}

const Dropdown = <
  T extends string | ReadonlyArray<string> | number | undefined
>({
  id,
  label,
  items,
  defaultChoice,
  onChange
}: DropdownProps<T>) => {
  const [choice, setChoice] = useState(defaultChoice);

  const onChangeChoice = useCallback(
    (e: SelectChangeEvent<T>) => {
      setChoice(e.target.value as T);
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <>
      <InputLabel id={id + '-label'}>{label}</InputLabel>
      <Select
        id={id}
        className={styles.dropdown}
        labelId={id + '-label'}
        label={label}
        value={choice}
        onChange={onChangeChoice}
      >
        {items.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
export default Dropdown;
