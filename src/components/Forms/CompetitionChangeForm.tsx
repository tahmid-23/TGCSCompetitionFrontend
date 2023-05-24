import { FormEventHandler, Fragment, MouseEventHandler, useCallback, useState } from 'react';
import MultipleChoice from '../InputComponents/MultipleChoice';
import TextBox from '../InputComponents/TextBox';
import { Award, Competition } from '../../competition';
import { AwardType } from '../../competition';
import Button from '../Button/Button';

interface CompetitionAddFormProps {
  competition?: Competition;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface AwardInputProps {
  index: number;
  award?: Award;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const AwardInput = ({ index, award, onClick }: AwardInputProps) => {
  return (
    <Fragment>
      <MultipleChoice
        name={`award${index}`}
        value="Trophy"
        id={`trophy${index}`}
        checked={award?.type === AwardType.TROPHY}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Medal"
        id={`medal${index}`}
        checked={award?.type === AwardType.MEDAL}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Money"
        id={`money${index}`}
        checked={award?.type === AwardType.MONEY}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Certificate"
        id={`certificate${index}`}
        checked={award?.type === AwardType.CERTIFICATE}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Recognition"
        id={`recognition${index}`}
        checked={award?.type === AwardType.RECOGNITION}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Other"
        id={`other${index}`}
        checked={award?.type === AwardType.OTHER}
      />
      &nbsp; &nbsp;
      <TextBox
        name="Description"
        id={`award_description${index}`}
        value={award?.description}
      />
      &nbsp;
      <Button text="X" onClick={onClick}></Button>
      <br />
    </Fragment>
  );
};

const CompetitionChangeForm = ({
  competition,
  onSubmit
}: CompetitionAddFormProps) => {
  const [awards, setAwards] = useState<(Award | undefined)[]>(
    competition ? [...competition.awards] : []
  );

  const removeAward = useCallback((awardIndex: number) => {
    const newAwards = [...awards];
    newAwards.splice(awardIndex, 1);
    setAwards(newAwards);
  }, [awards]);

  let maxId = -Infinity;
  let undefinedCount = 0;
  for (let i = 0; i < awards.length; ++i) {
    const awardId = awards[i]?.awardId;
    if (awardId) {
      if (awardId > maxId) {
        maxId = awardId;
      }
    } else {
      undefinedCount += 1;
    }
  }
  if (maxId === -Infinity) {
    maxId = -1;
  }

  const awardInputs = awards.map((award, i) => {
    let key;
    if (award?.awardId) {
      key = award.awardId;
    } else {
      key = maxId + undefinedCount--;
    }
  
    return <AwardInput key={key} index={i} award={award} onClick={() => removeAward(i)} />;
  });

  const onAddAward = useCallback(() => {
    setAwards([...awards, undefined]);
  }, [awards]);

  return (
    <form onSubmit={onSubmit}>
      <TextBox
        name="Judge Description"
        id="judge_description"
        value={competition?.judges_description}
      />
      <br />
      <TextBox
        name="Judging Criteria"
        id="judge_criteria"
        value={competition?.judging_criteria}
      />
      <br />
      {awardInputs}
      <br />
      <button type="button" onClick={onAddAward}>
        Add Award
      </button>
      <br />
      <input type="submit" value="Add Competition" />
    </form>
  );
};

export default CompetitionChangeForm;
