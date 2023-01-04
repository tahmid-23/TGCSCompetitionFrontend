interface TextBoxProps {
  name: string;
  id: string;
}

const TextBox = (
  {
    name,
    id
  }: TextBoxProps
) => {
  return (
    <>
      <input type="text" name={name} id={id} />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default TextBox;
