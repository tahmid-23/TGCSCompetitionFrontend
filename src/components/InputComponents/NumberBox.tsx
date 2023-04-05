interface NumberBoxProps {
  name: string;
  id: string;
  min?: string;
  max?: string;
  interval?: string;
  value?: number;
}

const NumberBox = ({ name, id, min, max, interval, value }: NumberBoxProps) => {
  return (
    <>
      <input
        type="number"
        id={id}
        name={name}
        min={min}
        max={max}
        step={interval}
        defaultValue={value}
      />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default NumberBox;
