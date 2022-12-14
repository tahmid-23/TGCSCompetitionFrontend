import { ChangeEventHandler } from 'react';

interface SearchBoxProps {
  name: string;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ name, id, onChange }) => {
  return <input type="text" name={name} id={id} onChange={onChange}></input>;
};

export default SearchBox;
