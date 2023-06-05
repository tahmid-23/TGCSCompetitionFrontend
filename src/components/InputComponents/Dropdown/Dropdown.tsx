import { MenuItem, TextField } from '@mui/material';
import { CSSProperties, ChangeEvent, useCallback, useState } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps<
  T extends string | ReadonlyArray<string> | number | undefined
> {
  id: string;
  name?: string;
  style?: CSSProperties;
  minWidth?: string;
  label: string;
  items: T[];
  defaultChoice?: T;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Dropdown = <
  T extends string | ReadonlyArray<string> | number | undefined
>({
  id,
  name,
  style,
  minWidth,
  label,
  items,
  defaultChoice,
  onChange
}: DropdownProps<T>) => {
  const [choice, setChoice] = useState(defaultChoice);

  const onChangeChoice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setChoice(e.target.value as T);
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <div style={style}>
      <TextField
        id={id}
        name={name}
        className={styles.dropdown}
        label={label}
        value={choice ? choice : ''}
        sx={{ minWidth: minWidth }}
        select
        onChange={onChangeChoice}
      >
        {items.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  );
};
export default Dropdown;
