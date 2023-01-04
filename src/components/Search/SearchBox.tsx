import { ChangeEventHandler } from 'react';

interface SearchBoxProps {
  name: string;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = (
  {
    name,
    id,
    onChange
  }: SearchBoxProps
) => {
  return <input type="text" name={name} id={id} onChange={onChange} />;
};

export default SearchBox;
