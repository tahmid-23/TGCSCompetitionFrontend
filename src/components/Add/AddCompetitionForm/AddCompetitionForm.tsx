import { FormEvent, useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import CompetitionChangeForm from '../../Change/CompetitionChangeForm/CompetitionChangeForm';
import { insert } from '../../../api/api';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectLogin } from '../../../features/login';

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

const AddCompetitionForm = () => {
  const loginState = useAppSelector(selectLogin);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState.admin) {
      navigate('/');
    }
  }, [loginState.admin, navigate]);

  if (!loginState.admin) {
    return <></>;
  }

  return (
    <CompetitionChangeForm
      onSubmit={(e) =>
        onSubmit(Number(params['experienceId']), navigate, e).catch(alert)
      }
    />
  );
};

export default AddCompetitionForm;
