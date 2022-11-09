import MultipleSelect from './MultipleSelect';

const GradeFilter = () => {
  return (
    <>
      <MultipleSelect name="bucket1" value="K-2"></MultipleSelect>
      <MultipleSelect name="bucket2" value="3-5"></MultipleSelect>
      <MultipleSelect name="bucket3" value="6-8"></MultipleSelect>
      <MultipleSelect name="bucket4" value="9-12"></MultipleSelect>
    </>
  );
};

export default GradeFilter;
