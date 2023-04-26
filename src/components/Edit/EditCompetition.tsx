import { FormEvent } from 'react';
import {
  NavigateFunction,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { IP_ADDRESS } from '../../Global';
import CompetitionChangeForm from '../Forms/CompetitionChangeForm';

async function onSubmit(
  experienceId: number,
  navigate: NavigateFunction,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  const judge_data = {
    competition_id: experienceId,
    judges_description: event.currentTarget['judge_description'].value,
    judging_criteria: event.currentTarget['judge_criteria'].value
  };
  const judgeRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rowId: experienceId,
      tableName: 'competition',
      data: judge_data
    })
  };
  const award_data = [];
  for (let i = 0; event.currentTarget[`award${i}`]; i++) {
    award_data.push({
      competition_id: experienceId,
      type: String(event.currentTarget[`award${i}`].value).toUpperCase(),
      description: event.currentTarget[`award_description${i}`].value
    });
  }

  await fetch(`${IP_ADDRESS}/update`, judgeRequestOptions).then((res) => {
    if (res.status === 400) {
      alert('Something went wrong!');
    } else if (res.status === 200 || res.status === 204) {
      alert('Success!');
      return res.json();
    } else {
      alert('We have no idea what went wrong\n But its not error 400.');
    }
  });

  for (const d of award_data) {
    const awardRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rowId: experienceId, tableName: 'award', data: d })
    };
    await fetch(`${IP_ADDRESS}/update`, awardRequestOptions).then((res) => {
      if (res.status === 400) {
        alert('Something went wrong!');
      } else if (res.status === 200 || res.status === 204) {
        alert('Success!');
        return res.json();
      } else {
        alert('We have no idea what went wrong\n But its not error 400.');
      }
    });
  }

  navigate(`/`);
}

const EditCompetition = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <CompetitionChangeForm
      onSubmit={(e) =>
        onSubmit(Number(searchParams.get('experienceId')), navigate, e)
      }
    />
  );
};

export default EditCompetition;