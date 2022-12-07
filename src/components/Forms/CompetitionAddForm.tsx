import { FormEventHandler, useState } from 'react';
import MultipleChoice from '../InputComponents/MultipleChoice';
import TextBox from '../InputComponents/TextBox';

interface CompetitionAddFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface AwardInputProps {
  index: number;
}

const AwardInput: React.FC<AwardInputProps> = ({ index }) => {
  return (
    <>
      <MultipleChoice
        name={`award${index}`}
        value="Trophy"
        id={`trophy${index}`}
      ></MultipleChoice>
      <MultipleChoice
        name={`award${index}`}
        value="Medal"
        id={`medal${index}`}
      ></MultipleChoice>
      <MultipleChoice
        name={`award${index}`}
        value="Money"
        id={`money${index}`}
      ></MultipleChoice>
      <MultipleChoice
        name={`award${index}`}
        value="Certificate"
        id={`certificate${index}`}
      ></MultipleChoice>
      <MultipleChoice
        name={`award${index}`}
        value="Recognition"
        id={`recognition${index}`}
      ></MultipleChoice>
      <MultipleChoice
        name={`award${index}`}
        value="Other"
        id={`other${index}`}
      ></MultipleChoice>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <TextBox name="Description" id={`award_description${index}`}></TextBox>
      <br></br>
    </>
  );
};

const CompetitionAddForm: React.FC<CompetitionAddFormProps> = ({
  onSubmit
}) => {
  const [awardAmount, setAwardAmount] = useState(0);

  const z = Array.from({ length: awardAmount }, (_e, i) => {
    return <AwardInput index={i}></AwardInput>;
  });
  return (
    <form onSubmit={onSubmit}>
      <TextBox name="Judge Description" id="judge_description"></TextBox>
      <br></br>
      <TextBox name="Judging Criteria" id="judge_criteria"></TextBox>
      <br></br>
      <button type="button" onClick={() => setAwardAmount(awardAmount + 1)}>
        Add Award
      </button>
      <br></br>
      {z}
      <br></br>
      <input type="submit" value="Add Competition"></input>
    </form>
  );
};

export default CompetitionAddForm;
