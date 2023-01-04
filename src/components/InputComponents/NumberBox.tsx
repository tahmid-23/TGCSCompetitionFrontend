interface NumberBoxProps {
  name: string;
  id: string;
  min?: string;
  max?: string;
  interval?: string;
}

const NumberBox = (
  {
    name,
    id,
    min,
    max,
    interval
  }: NumberBoxProps
) => {
  return (
    <>
      <input
        type="number"
        id={id}
        name={name}
        min={min}
        max={max}
        step={interval}
      />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default NumberBox;
