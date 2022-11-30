interface URLBoxProps {
  name: string;
  id: string;
}

const URLBox: React.FC<URLBoxProps> = ({ name, id }) => {
  return (
    <>
      <input type="url" name={name} id={id}></input>
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default URLBox;
