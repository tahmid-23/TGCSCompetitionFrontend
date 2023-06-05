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
        label={getAwardTypeDisplay(AwardType.TROPHY)}
        control={
          <Checkbox
            name="trophy"
            value={AwardType[AwardType.TROPHY]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getAwardTypeDisplay(AwardType.MEDAL)}
        control={
          <Checkbox
            name="medal"
            value={AwardType[AwardType.MEDAL]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getAwardTypeDisplay(AwardType.MONEY)}
        control={
          <Checkbox
            name="money"
            value={AwardType[AwardType.MONEY]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getAwardTypeDisplay(AwardType.CERTIFICATE)}
        control={
          <Checkbox
            name="certificate"
            value={AwardType[AwardType.CERTIFICATE]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getAwardTypeDisplay(AwardType.RECOGNITION)}
        control={
          <Checkbox
            name="recognition"
            value={AwardType[AwardType.RECOGNITION]}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getAwardTypeDisplay(AwardType.OTHER)}
        control={
          <Checkbox
            name="other"
            value={AwardType[AwardType.OTHER]}
            onChange={onChange}
          />
        }
      />
    </FormGroup>
  );
};

export default AwardSelection;
