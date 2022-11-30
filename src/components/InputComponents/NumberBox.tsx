interface NumberBoxProps {
  name: string;
  id: string;
  min?: string;
  max?: string;
  interval?: string;
}

const NumberBox: React.FC<NumberBoxProps> = ({
  name,
  id,
  min,
  max,
  interval
}) => {
  return (
    <>
      <input
        type="number"
        id={id}
        name={name}
        min={min}
        max={max}
        step={interval}
      ></input>
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default NumberBox;
