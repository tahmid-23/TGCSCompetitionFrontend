import { ChangeEvent, useCallback } from 'react';
import { AwardType } from '../../api/model/competition';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { getAwardTypeDisplay } from '../../api/model/competition';

interface AwardSelectionProps {
  awards: AwardType[];
  onAwardChange?: (awards: AwardType[]) => void;
}

const AwardSelection = ({ awards, onAwardChange }: AwardSelectionProps) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newAwards;
      if (e.currentTarget.checked) {
        newAwards = awards.concat(
          AwardType[e.currentTarget.value as keyof typeof AwardType]
        );
      } else {
        newAwards = awards.filter(
          (award) =>
            award !== AwardType[e.currentTarget.value as keyof typeof AwardType]
        );
      }

      onAwardChange?.(newAwards);
    },
    [awards, onAwardChange]
  );

  return (
    <FormGroup row>
      <FormControlLabel
        label={getAwardTypeDisplay(AwardType.TROPHY)}
        control={
          <Checkbox
            name="trophy"
            value={AwardType[AwardType.TROPHY]}
            checked={awards.includes(AwardType.TROPHY)}
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
            checked={awards.includes(AwardType.MEDAL)}
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
            checked={awards.includes(AwardType.MONEY)}
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
            checked={awards.includes(AwardType.CERTIFICATE)}
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
            checked={awards.includes(AwardType.RECOGNITION)}
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
            checked={awards.includes(AwardType.OTHER)}
            onChange={onChange}
          />
        }
      />
    </FormGroup>
  );
};

export default AwardSelection;
