import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IP_ADDRESS } from '../../Global';
import ChangeForm from '../Forms/ChangeForm';
import {
  Category,
  Experience,
  ExperienceCategory,
  ExperienceGrade,
  ExperienceType,
  Grade
} from '../../experience';

function getValue(event: FormEvent<HTMLFormElement>, id: string) {
  const value = event.currentTarget[id].value;
  if (value === '') {
    return null;
  }

  return value;
}

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const experienceId = Number(params['experienceId']);
  const [experience, setExperience] = useState<Experience>();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const type: string = getValue(event, 'Type');
      const experience_data = {
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
      const experienceRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableName: 'experience',
          rowId: experienceId,
          data: experience_data
        })
      };
      const selected_grades = [];
      for (let i = 1; i <= 4; i++) {
        if (event.currentTarget[`bucket${i}`].checked) {
          selected_grades.push(getValue(event, `bucket${i}`));
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
      const selected_topics = [];
      for (const topic of topics) {
        if (event.currentTarget[topic].checked) {
          selected_topics.push(String(getValue(event, topic)).toUpperCase());
        }
      }

      try {
        await fetch(`${IP_ADDRESS}/update`, experienceRequestOptions).then(
          (res) => {
            if (res.status === 400) {
              throw new Error('Something went wrong!');
            } else if (res.status === 200 || res.status === 204) {
              return res.json();
            } else {
              throw new Error(
                'We have no idea what went wrong\n But its not error 400.'
              );
            }
          }
        );
      } catch (err) {
        alert(err);
        return;
      }

      const promises = [];
      for (const g of selected_grades) {
        const grade_data = {
          experience_id: experienceId,
          grade: g
        };
        const gradeRequestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rowId: experienceId,
            tableName: 'experience_grade',
            data: grade_data
          })
        };
        const gradePromise = fetch(
          `${IP_ADDRESS}/update`,
          gradeRequestOptions
        ).then((res) => {
          if (res.status === 400) {
            throw new Error('Something went wrong!');
          } else if (res.status === 200 || res.status === 204) {
            return 'Success!';
          } else {
            throw new Error(
              'We have no idea what went wrong\n But its not error 400.'
            );
          }
        });
        promises.push(gradePromise);
      }

      for (const t of selected_topics) {
        const topic_data = {
          experience_id: experienceId,
          category: t
        };
        const topicRequestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rowId: experienceId,
            tableName: 'experience_category',
            data: topic_data
          })
        };
        const topicPromise = fetch(
          `${IP_ADDRESS}/update`,
          topicRequestOptions
        ).then((res) => {
          if (res.status === 400) {
            throw new Error('Something went wrong!');
          } else if (res.status === 200 || res.status === 204) {
            return res.json();
          } else {
            throw new Error(
              'We have no idea what went wrong\n But its not error 400.'
            );
          }
        });
        promises.push(topicPromise);
      }

      await Promise.all(promises)
        .then(() => {
          alert('Success!');
          navigate(`/edit_${type.toLowerCase()}?experienceId=${experienceId}`);
        })
        .catch(alert);
    },
    [experienceId, navigate]
  );

  const downloadData = useCallback(async () => {
    await fetch(`${IP_ADDRESS}/experience/${experienceId}`)
      .then((res) => res.json())
      .then((res) => {
        const experience = res as unknown as any;
        experience.type =
          ExperienceType[experience.type as keyof typeof ExperienceType];
        const newGrades: ExperienceGrade[] = [];
        for (const grade of experience.grades) {
          newGrades.push({ grade: Grade[grade.grade as keyof typeof Grade] });
        }
        experience.grades = newGrades;
        const newCategories: ExperienceCategory[] = [];
        for (const category of experience.categories) {
          newCategories.push({
            category: Category[category.category as keyof typeof Category]
          });
        }
        experience.categories = newCategories;

        setExperience(experience);
      });
  }, [experienceId]);

  useEffect(() => {
    downloadData();
  }, [downloadData]);

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

export default Edit;
