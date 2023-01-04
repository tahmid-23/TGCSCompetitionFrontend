import MultipleSelect from '../InputComponents/MultipleSelect';

const GradeFilter = () => {
  return (
    <>
      <MultipleSelect name="bucket1" value="K-2" />
      <MultipleSelect name="bucket2" value="3-5" />
      <MultipleSelect name="bucket3" value="6-8" />
      <MultipleSelect name="bucket4" value="9-12" />
    </>
  );
};

export default GradeFilter;
