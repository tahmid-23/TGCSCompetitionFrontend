interface MultipleChoiceProps {
  name: string;
  id: string;
  value: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ name, id, value }) => {
  return (
    <>
      <input type="radio" id={id} name={name} value={value}></input>
      <label htmlFor={id}>{value}</label>
    </>
  );
};

export default MultipleChoice;
