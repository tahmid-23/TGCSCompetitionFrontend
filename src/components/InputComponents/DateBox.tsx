interface DateBoxProps {
  name: string;
  id: string;
}

const DateBox = (
  {
    name,
    id
  }: DateBoxProps
) => {
  return (
    <>
      <input type="date" name={name} id={id} />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default DateBox;
