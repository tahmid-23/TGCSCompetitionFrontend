import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChangeForm from '../Change/ChangeForm';
import { Experience } from '../../api/model/experience';
import { getExperience, insert, remove, update } from '../../api/api';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectLogin } from '../../features/login';

function getValue(event: FormEvent<HTMLFormElement>, id: string) {
  const value = event.currentTarget[id].value;
  if (value === '') {
    return null;
  }

  return value;
}

const EditForm = () => {
  const loginState = useAppSelector(selectLogin);
  const params = useParams();
  const navigate = useNavigate();
  const experienceId = Number(params['experienceId']);
  const [experience, setExperience] = useState<Experience>();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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
        'biology',
        'chemistry',
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
        'languageArts',
        'geo',
        'spelling',
        'history',
        'foreignLanguage',
        'chess',
        'research',
        'other'
      ];
      const selected_topics = [];
      for (const topic of topics) {
        if (event.currentTarget[topic].checked) {
          selected_topics.push(String(getValue(event, topic)));
        }
      }

      try {
        await update('experience', experienceId, experienceData, () =>
          navigate('/login')
        );
      } catch (err) {
        console.error(err);
        alert('Something went wrong!');
        return;
      }

      try {
        await remove('experience_grade', 'experience_id', experienceId, () =>
          navigate('/login')
        );
        await remove('experience_category', 'experience_id', experienceId, () =>
          navigate('/login')
        );
      } catch (err) {
        console.error(err);
        alert('Something went wrong!');
        return;
      }

      const promises = [];
      for (const g of selectedGrades) {
        const gradeData = {
          experience_id: experienceId,
          grade: g
        };
        const gradePromise = insert('experience_grade', gradeData, () =>
          navigate('/login')
        ).catch((err) => {
          console.error(err);
          throw new Error('Something went wrong!');
        });
        promises.push(gradePromise);
      }

      for (const t of selected_topics) {
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
          navigate(`/edit-${type.toLowerCase()}/${experienceId}`);
        })
        .catch(alert);
    },
    [experienceId, navigate]
  );

  const downloadData = useCallback(async () => {
    await getExperience(experienceId, () => navigate('/login')).then(
      setExperience
    );
  }, [experienceId, navigate]);

  useEffect(() => {
    if (loginState.admin) {
      downloadData();
    }
  }, [downloadData, loginState.admin, navigate]);

  if (!loginState.admin) {
    navigate('/');
    return <></>;
  }

  if (!experience) {
    return <></>;
  }

  return (
    <>
      <h1>Edit</h1>
      <ChangeForm experience={experience} onSubmit={onSubmit} />
    </>
  );
};

export default EditForm;
