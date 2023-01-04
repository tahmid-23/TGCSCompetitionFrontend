import { FormEventHandler, useState } from 'react';
import MultipleChoice from '../InputComponents/MultipleChoice';
import TextBox from '../InputComponents/TextBox';

interface CompetitionAddFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface AwardInputProps {
  index: number;
}

const AwardInput = (
  {
    index
  }: AwardInputProps
) => {
  return (
    <>
      <MultipleChoice
        name={`award${index}`}
        value="Trophy"
        id={`trophy${index}`}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Medal"
        id={`medal${index}`}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Money"
        id={`money${index}`}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Certificate"
        id={`certificate${index}`}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Recognition"
        id={`recognition${index}`}
      />
      <MultipleChoice
        name={`award${index}`}
        value="Other"
        id={`other${index}`}
      />
      &nbsp; &nbsp; &nbsp; &nbsp;
      <TextBox name="Description" id={`award_description${index}`} />
      <br />
    </>
  );
};

const CompetitionAddForm = (
  {
    onSubmit
  }: CompetitionAddFormProps
) => {
  const [awardAmount, setAwardAmount] = useState(0);

  const z = Array.from({ length: awardAmount }, (_e, i) => {
    return <AwardInput index={i} />;
  });
  return (
    <form onSubmit={onSubmit}>
      <TextBox name="Judge Description" id="judge_description" />
      <br />
      <TextBox name="Judging Criteria" id="judge_criteria" />
      <br />
      <button type="button" onClick={() => setAwardAmount(awardAmount + 1)}>
        Add Award
      </button>
      <br />
      {z}
      <br />
      <input type="submit" value="Add Competition" />
    </form>
  );
};

export default CompetitionAddForm;
