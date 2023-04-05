interface MultipleChoiceProps {
  name: string;
  id: string;
  value: string;
  checked?: boolean;
}

const MultipleChoice = ({ name, id, value, checked }: MultipleChoiceProps) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={checked}
      />
      <label htmlFor={id}>{value}</label>
    </>
  );
};

export default MultipleChoice;
