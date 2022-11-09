import MultipleChoice from './MultipleChoice';

const ProgramFilter = () => {
  return (
    <>
      <MultipleChoice
        name="prog_type"
        id="intern"
        value="Internship"
      ></MultipleChoice>
      <MultipleChoice
        name="prog_type"
        id="academic"
        value="Academic"
      ></MultipleChoice>
      <MultipleChoice
        name="prog_type"
        id="presentation"
        value="Presentation"
      ></MultipleChoice>
      <MultipleChoice
        name="prog_type"
        id="research"
        value="Research"
      ></MultipleChoice>
    </>
  );
};

export default ProgramFilter;
