interface TextBoxProps {
  name: string;
  id: string;
  value?: string;
}

const TextBox = ({ name, id, value }: TextBoxProps) => {
  return (
    <>
      <label htmlFor={id}>{name}</label>
      &nbsp;
      <input type="text" name={name} id={id} defaultValue={value} />
    </>
  );
};

export default TextBox;
