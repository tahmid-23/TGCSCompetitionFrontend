interface CheckBoxProps {
  name: string;
  id: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ name, id }) => {
  return (
    <>
      <input type="checkbox" name={name} id={id}></input>
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default CheckBox;
