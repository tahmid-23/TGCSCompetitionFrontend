interface DateBoxProps {
  name: string;
  id: string;
}

const DateBox: React.FC<DateBoxProps> = ({ name, id }) => {
  return (
    <>
      <input type="date" name={name} id={id}></input>
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default DateBox;
