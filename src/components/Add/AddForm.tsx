import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ChangeForm from '../Change/ChangeForm';
import { insert } from '../../api/api';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectLogin } from '../../features/login';
import { useRefreshLoginState } from '../../hooks/login-hooks';

function getValue(event: FormEvent<HTMLFormElement>, id: string) {
  const value = event.currentTarget[id].value;
  if (value === '') {
    return null;
  }

  return value;
}

async function onSubmit(
  navigate: NavigateFunction,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  const type: string = getValue(event, 'Type');
  const experienceData = {
    website_url: getValue(event, 'url'),
    entry_fee: getValue(event, 'fee'),
    participant_count: getValue(event, 'participant_count'),
    name: getValue(event, 'name'),
    origin_year: getValue(event, 'origin_year'),
    purpose: getValue(event, 'purpose'),
    description: getValue(event, 'description'),
    required_items: getValue(event, 'required_items'),
    advice: getValue(event, 'advice'),
    score_time: getValue(event, 'time_score'),
    score_difficulty: getValue(event, 'difficulty_score'),
    score_benefit: getValue(event, 'benefit_score'),
    score_mgmt: getValue(event, 'management_score'),
    type: type.toUpperCase(),
    virtual: getValue(event, 'virtual') === 'on',
    address: getValue(event, 'address'),
    prerequisite_description: getValue(event, 'prerequisite_description'),
    entry_description: getValue(event, 'entry_description')
  };

  const selectedGrades = [];
  for (let i = 1; i <= 4; i++) {
    if (event.currentTarget[`bucket${i}`].checked) {
      selectedGrades.push(getValue(event, `bucket${i}`));
    }
  }
  const topics = [
    'technology',
    'science',
    'bio',
    'chem',
    'physics',
    'math',
    'engineering',
    'business',
    'medical',
    'culinary',
    'music',
    'sports',
    'art',
    'theater',
    'dance',
    'english',
    'geo',
    'spelling',
    'history',
    'foreign',
    'chess',
    'research',
    'other'
  ];
  const selectedTopics = [];
  for (const topic of topics) {
    if (event.currentTarget[topic].checked) {
      selectedTopics.push(String(getValue(event, topic)));
    }
  }

  let experienceId: number;
  try {
    experienceId = await insert('experience', experienceData, () =>
      navigate('/login')
    );
  } catch (err) {
    alert('Something went wrong!');
    console.error(err);
    return;
  }

  const promises = [];
  for (const g of selectedGrades) {
    const gradeData = {
      experience_id: experienceId,
      grade: g
    };
    try {
      experienceId = await insert('experience', experienceData, () => {
        navigate('/login');
      });
    } catch (err) {
      alert('Something went wrong!');
      console.error(err);
      return;
    }
    const gradePromise = insert('experience_grade', gradeData, () => {
      navigate('/login');
    }).catch((err) => {
      console.error(err);
      throw new Error('Something went wrong!');
    });
    promises.push(gradePromise);
  }

  for (const t of selectedTopics) {
    const topicData = {
      experience_id: experienceId,
      category: t
    };
    const topicPromise = insert('experience_category', topicData, () =>
      navigate('/login')
    ).catch((err) => {
      console.error(err);
      throw new Error('Something went wrong!');
    });
    promises.push(topicPromise);
  }

  await Promise.all(promises)
    .then(() => {
      alert('Success!');
      navigate(`/add-${type.toLowerCase()}/${experienceId}`);
    })
    .catch(alert);
}

const AddForm = () => {
  const adminState = useAppSelector(selectLogin);
  const navigate = useNavigate();
  const refreshed = useRefreshLoginState();

  if (!refreshed) {
    return <></>;
  }

  if (!adminState.admin) {
    navigate('/');
    return <></>;
  }

  return (
    <>
      <h1>Add</h1>
      <ChangeForm onSubmit={(e) => onSubmit(navigate, e)} />
    </>
  );
};

export default AddForm;
