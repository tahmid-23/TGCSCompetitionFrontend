interface URLBoxProps {
  name: string;
  id: string;
}

const URLBox = (
  {
    name,
    id
  }: URLBoxProps
) => {
  return (
    <>
      <input type="url" name={name} id={id} />
      <label htmlFor={id}>{name}</label>
    </>
  );
};

export default URLBox;
