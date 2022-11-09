interface SearchBoxProps {
  name: string;
  id: string;
  output: (searchString: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ name, id, output }) => {
  return (
    <input
      type="text"
      name={name}
      id={id}
      onChange={(e) => {
        output(e.target.value);
      }}
    ></input>
  );
};

export default SearchBox;
