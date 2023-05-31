import { ChangeEvent, useCallback, useState } from 'react';
import { AwardType } from '../../api/model/competition';
import MultipleSelect from '../InputComponents/MultipleSelect';

interface AwardSelectionProps {
  onAwardChange?: (awards: AwardType[]) => void;
}

const AwardSelection = ({ onAwardChange }: AwardSelectionProps) => {
  const [awards, setAwards] = useState<AwardType[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newAwards;
      if (e.currentTarget.checked) {
        setAwards(
          (newAwards = awards.concat(
            AwardType[e.currentTarget.value as keyof typeof AwardType]
          ))
        );
      } else {
        setAwards(
          (newAwards = awards.filter(
            (award) =>
              award !==
              AwardType[e.currentTarget.value as keyof typeof AwardType]
          ))
        );
      }

      onAwardChange?.(newAwards);
    },
    [awards, onAwardChange]
  );

  return (
    <>
      <MultipleSelect
        name="trophy"
        value={AwardType[AwardType.TROPHY]}
        label="Trophy"
        onChange={onChange}
      />
      <MultipleSelect
        name="medal"
        value={AwardType[AwardType.MEDAL]}
        label="Medal"
        onChange={onChange}
      />
      <MultipleSelect
        name="money"
        value={AwardType[AwardType.MONEY]}
        label="Money"
        onChange={onChange}
      />
      <MultipleSelect
        name="certificate"
        value={AwardType[AwardType.CERTIFICATE]}
        label="Certificate"
        onChange={onChange}
      />
      <MultipleSelect
        name="recognition"
        value={AwardType[AwardType.RECOGNITION]}
        label="Recognition"
        onChange={onChange}
      />
      <MultipleSelect
        name="other"
        value={AwardType[AwardType.OTHER]}
        label="Other"
        onChange={onChange}
      />
    </>
  );
};

export default AwardSelection;
