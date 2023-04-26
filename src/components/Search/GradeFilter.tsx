import MultipleSelect from '../InputComponents/MultipleSelect';

interface GradeFilterProps {
  checkedA?: boolean;
  checkedB?: boolean;
  checkedC?: boolean;
  checkedD?: boolean;
}

const GradeFilter = ({
  checkedA,
  checkedB,
  checkedC,
  checkedD
}: GradeFilterProps) => {
  return (
    <>
      <MultipleSelect name="bucket1" value="K-2" defaultChecked={checkedA} />
      <MultipleSelect name="bucket2" value="3-5" defaultChecked={checkedB} />
      <MultipleSelect name="bucket3" value="6-8" defaultChecked={checkedC} />
      <MultipleSelect name="bucket4" value="9-12" defaultChecked={checkedD} />
    </>
  );
};

export default GradeFilter;
