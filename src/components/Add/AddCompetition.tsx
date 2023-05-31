import { FormEvent } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import CompetitionChangeForm from '../Forms/CompetitionChangeForm';
import { insert } from '../../api/api';

async function onSubmit(
  experienceId: number,
  navigate: NavigateFunction,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  const judgeData = {
    competition_id: experienceId,
    judges_description: event.currentTarget['judge_description'].value,
    judging_criteria: event.currentTarget['judge_criteria'].value
  };
  const awardData = [];
  for (let i = 0; event.currentTarget[`award${i}`]; i++) {
    awardData.push({
      competition_id: experienceId,
      type: String(event.currentTarget[`award${i}`].value).toUpperCase(),
      description: event.currentTarget[`award_description${i}`].value
    });
  }

  await insert('competition', judgeData, () => navigate('/login')).catch(
    (err) => {
      console.error(err);
      throw Error('Something went wrong!');
    }
  );

  for (const d of awardData) {
    await insert('award', d, () => navigate('/login')).catch((err) => {
      console.error(err);
      throw Error('Something went wrong!');
    });
  }

  navigate(`/`);
}

const AddCompetition = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <CompetitionChangeForm
      onSubmit={(e) =>
        onSubmit(Number(params['experienceId']), navigate, e).catch(alert)
      }
    />
  );
};

export default AddCompetition;
