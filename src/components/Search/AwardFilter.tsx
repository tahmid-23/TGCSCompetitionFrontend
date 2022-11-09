import MultipleSelect from './MultipleSelect';

const AwardFilter = () => {
  return (
    <>
      <MultipleSelect name="trophy" value="Trophy"></MultipleSelect>
      <MultipleSelect name="medal" value="Medal"></MultipleSelect>
      <MultipleSelect name="money" value="Money"></MultipleSelect>
      <MultipleSelect name="certificate" value="Certificate"></MultipleSelect>
      <MultipleSelect name="recognition" value="Recognition"></MultipleSelect>
      <MultipleSelect name="other" value="Other"></MultipleSelect>
    </>
  );
};

export default AwardFilter;
