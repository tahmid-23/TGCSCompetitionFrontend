import { FormEvent, MouseEventHandler, useCallback, useState } from 'react';
import {
  Competition,
  Award,
  AwardType,
  getAwardTypeDisplay
} from '../../../api/model/competition';
import {
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface CompetitionAddFormProps {
  competition?: Competition;
  onSubmit: (event: FormEvent<HTMLFormElement>, uuids: string[]) => void;
}

interface AwardInputProps {
  index: string;
  award?: Award;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const AwardInput = ({ index, award, onClick }: AwardInputProps) => {
  let awardTypeValue;
  switch (award?.type) {
    case AwardType.TROPHY:
      awardTypeValue = AwardType[AwardType.TROPHY];
      break;
    case AwardType.MEDAL:
      awardTypeValue = AwardType[AwardType.MEDAL];
      break;
    case AwardType.MONEY:
      awardTypeValue = AwardType[AwardType.MONEY];
      break;
    case AwardType.CERTIFICATE:
      awardTypeValue = AwardType[AwardType.CERTIFICATE];
      break;
    case AwardType.RECOGNITION:
      awardTypeValue = AwardType[AwardType.RECOGNITION];
      break;
    case AwardType.OTHER:
      awardTypeValue = AwardType[AwardType.OTHER];
      break;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <RadioGroup name={`award${index}`} defaultValue={awardTypeValue} row>
        <FormControlLabel
          control={<Radio value={AwardType[AwardType.TROPHY]} required />}
          label={getAwardTypeDisplay(AwardType.TROPHY)}
        />
        <FormControlLabel
          control={<Radio value={AwardType[AwardType.MEDAL]} required />}
          label={getAwardTypeDisplay(AwardType.MEDAL)}
        />
        <FormControlLabel
          control={<Radio value={AwardType[AwardType.MONEY]} required />}
          label={getAwardTypeDisplay(AwardType.MONEY)}
        />
        <FormControlLabel
          control={<Radio value={AwardType[AwardType.CERTIFICATE]} required />}
          label={getAwardTypeDisplay(AwardType.CERTIFICATE)}
        />
        <FormControlLabel
          control={<Radio value={AwardType[AwardType.RECOGNITION]} required />}
          label={getAwardTypeDisplay(AwardType.RECOGNITION)}
        />
        <FormControlLabel
          control={<Radio value={AwardType[AwardType.OTHER]} required />}
          label={getAwardTypeDisplay(AwardType.OTHER)}
        />
      </RadioGroup>
      <TextField
        id={`award_description${index}`}
        label="Description"
        defaultValue={award?.description}
      />

      <IconButton onClick={onClick}>
        <Close />
      </IconButton>
    </div>
  );
};

const CompetitionChangeForm = ({
  competition,
  onSubmit
}: CompetitionAddFormProps) => {
  const [awards, setAwards] = useState<[Award | undefined, string][]>(
    competition
      ? competition.awards.map((award) => [award, crypto.randomUUID()])
      : []
  );

  const removeAward = useCallback(
    (awardIndex: number) => {
      const newAwards = [...awards];
      newAwards.splice(awardIndex, 1);
      setAwards(newAwards);
    },
    [awards]
  );

  const awardInputs = awards.map((award, i) => {
    return (
      <AwardInput
        key={award[1]}
        index={award[1]}
        award={award[0]}
        onClick={() => removeAward(i)}
      />
    );
  });

  const onAddAward = useCallback(() => {
    setAwards([...awards, [undefined, crypto.randomUUID()]]);
  }, [awards]);

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      onSubmit?.(
        e,
        awards.map((award) => award[1])
      );
    },
    [awards, onSubmit]
  );

  return (
    <form onSubmit={onFormSubmit}>
      <Stack sx={{ alignItems: 'flex-start' }} spacing={1}>
        <TextField
          id="judge_description"
          label="Judge Description"
          variant="standard"
          defaultValue={competition?.judges_description}
        />
        <TextField
          id="judge_criteria"
          label="Judging Criteria"
          variant="standard"
          defaultValue={competition?.judging_criteria}
          required
        />
        {awardInputs}
        <Button variant="contained" onClick={onAddAward}>
          Add Award
        </Button>
        <Button type="submit" variant="contained">
          Finish
        </Button>
      </Stack>
    </form>
  );
};

export default CompetitionChangeForm;
