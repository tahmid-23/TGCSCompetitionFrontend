interface CheckBoxProps {
  name: string;
  id: string;
}

const CheckBox = (
  {
    name,
    id
  }: CheckBoxProps
) => {
  return (
    <>
      <input type="checkbox" name={name} id={id} />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default CheckBox;
