import MultipleSelect from '../InputComponents/MultipleSelect';

const AwardFilter = () => {
  return (
    <>
      <MultipleSelect name="trophy" value="Trophy" />
      <MultipleSelect name="medal" value="Medal" />
      <MultipleSelect name="money" value="Money" />
      <MultipleSelect name="certificate" value="Certificate" />
      <MultipleSelect name="recognition" value="Recognition" />
      <MultipleSelect name="other" value="Other" />
    </>
  );
};

export default AwardFilter;
