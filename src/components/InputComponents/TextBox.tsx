interface TextBoxProps {
  name: string;
  id: string;
  value?: string;
}

const TextBox = ({ name, id, value }: TextBoxProps) => {
  return (
    <>
      <input type="text" name={name} id={id} defaultValue={value} />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default TextBox;
