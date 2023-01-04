import MultipleChoice from '../InputComponents/MultipleChoice';

const ProgramFilter = () => {
  return (
    <>
      <MultipleChoice name="prog_type" id="intern" value="Internship" />
      <MultipleChoice name="prog_type" id="academic" value="Academic" />
      <MultipleChoice name="prog_type" id="presentation" value="Presentation" />
      <MultipleChoice name="prog_type" id="research" value="Research" />
    </>
  );
};

export default ProgramFilter;
