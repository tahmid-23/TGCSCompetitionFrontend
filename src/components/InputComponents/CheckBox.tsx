interface CheckBoxProps {
  name: string;
  id: string;
  checked?: boolean;
}

const CheckBox = ({ name, id, checked }: CheckBoxProps) => {
  return (
    <>
      <input type="checkbox" name={name} id={id} defaultChecked={checked} />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default CheckBox;
