import { AwardType } from '../../api/model/competition';
import MultipleSelect from '../InputComponents/MultipleSelect';

const AwardSelection = () => {
  return (
    <>
      <MultipleSelect
        name="trophy"
        value={AwardType[AwardType.TROPHY]}
        label="Trophy"
      />
      <MultipleSelect
        name="medal"
        value={AwardType[AwardType.MEDAL]}
        label="Medal"
      />
      <MultipleSelect
        name="money"
        value={AwardType[AwardType.MONEY]}
        label="Money"
      />
      <MultipleSelect
        name="certificate"
        value={AwardType[AwardType.CERTIFICATE]}
        label="Certificate"
      />
      <MultipleSelect
        name="recognition"
        value={AwardType[AwardType.RECOGNITION]}
        label="Recognition"
      />
      <MultipleSelect
        name="other"
        value={AwardType[AwardType.OTHER]}
        label="Other"
      />
    </>
  );
};

export default AwardSelection;
