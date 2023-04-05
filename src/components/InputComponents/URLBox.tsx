interface URLBoxProps {
  name: string;
  id: string;
  value?: string;
}

const URLBox = ({ name, id, value }: URLBoxProps) => {
  return (
    <>
      <input type="url" name={name} id={id} defaultValue={value} />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default URLBox;
