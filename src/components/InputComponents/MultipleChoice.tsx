interface MultipleChoiceProps {
  name: string;
  id: string;
  value: string;
}

const MultipleChoice = (
  {
    name,
    id,
    value
  }: MultipleChoiceProps
) => {
  return (
    <>
      <input type="radio" id={id} name={name} value={value} />
      <label htmlFor={id}>{value}</label>
    </>
  );
};

export default MultipleChoice;
