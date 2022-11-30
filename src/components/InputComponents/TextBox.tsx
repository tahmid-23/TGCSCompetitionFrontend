interface TextBoxProps {
  name: string;
  id: string;
}

const TextBox: React.FC<TextBoxProps> = ({ name, id }) => {
  return (
    <>
      <input type="text" name={name} id={id}></input>
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default TextBox;
