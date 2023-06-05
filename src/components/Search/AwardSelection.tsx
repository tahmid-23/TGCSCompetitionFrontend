import { ChangeEvent, useCallback, useState } from 'react';
import { AwardType } from '../../api/model/competition';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { getAwardTypeDisplay } from '../../api/model/competition';

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
    <FormGroup>
      <FormControlLabel
        name="trophy"
        label={getAwardTypeDisplay(AwardType.TROPHY)}
        control={
          <Checkbox value={AwardType[AwardType.TROPHY]} onChange={onChange} />
        }
      />
      <FormControlLabel
        name="medal"
        label={getAwardTypeDisplay(AwardType.MEDAL)}
        control={
          <Checkbox value={AwardType[AwardType.MEDAL]} onChange={onChange} />
        }
      />
      <FormControlLabel
        name="money"
        label={getAwardTypeDisplay(AwardType.MONEY)}
        control={
          <Checkbox value={AwardType[AwardType.MONEY]} onChange={onChange} />
        }
      />
      <FormControlLabel
        name="certificate"
        label={getAwardTypeDisplay(AwardType.CERTIFICATE)}
        control={
          <Checkbox
            value={AwardType[AwardType.CERTIFICATE]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="recognition"
        label={getAwardTypeDisplay(AwardType.RECOGNITION)}
        control={
          <Checkbox
            value={AwardType[AwardType.RECOGNITION]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="other"
        label={getAwardTypeDisplay(AwardType.OTHER)}
        control={
          <Checkbox value={AwardType[AwardType.OTHER]} onChange={onChange} />
        }
      />
    </FormGroup>
  );
};

export default AwardSelection;
