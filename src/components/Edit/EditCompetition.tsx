import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IP_ADDRESS } from '../../Global';
import CompetitionChangeForm from '../Forms/CompetitionChangeForm';
import { Award, Competition } from '../../competition';
import { AwardType } from '../../competition';

const EditCompetition = () => {
  const params = useParams();
  const navigate = useNavigate();
  const competitionId = Number(params['competitionId']);
  const [competition, setCompetition] = useState<Competition>();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const judge_data = {
        competition_id: competitionId,
        judges_description: event.currentTarget['judge_description'].value,
        judging_criteria: event.currentTarget['judge_criteria'].value
      };
      const judgeRequestOptions: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rowId: competitionId,
          tableName: 'competition',
          data: judge_data
        })
      };
      const award_data = [];
      for (let i = 0; event.currentTarget[`award${i}`]; i++) {
        award_data.push({
          competition_id: competitionId,
          type: String(event.currentTarget[`award${i}`].value).toUpperCase(),
          description: event.currentTarget[`award_description${i}`].value
        });
      }

      await fetch(`${IP_ADDRESS}/update`, judgeRequestOptions).then((res) => {
        if (res.status === 400) {
          alert('Something went wrong!');
        } else if (res.status === 401) {
          navigate("/login");
        } else if (res.status !== 200 && res.status !== 204) {
          alert('We have no idea what went wrong\n But its not error 400.');
        }
      });

      await fetch(`${IP_ADDRESS}/remove`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableName: 'award',
          rowName: 'competition_id',
          rowId: competitionId
        })
      });
      for (const d of award_data) {
        const awardRequestOptions: RequestInit = {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tableName: 'award', data: d })
        };
        await fetch(`${IP_ADDRESS}/insert`, awardRequestOptions).then((res) => {
          if (res.status === 400) {
            alert('Something went wrong!');
          } else if (res.status === 401) {
            navigate("/login");
          } else if (res.status === 200 || res.status === 204) {
            alert('Success!');
            return res.json();
          } else {
            alert('We have no idea what went wrong\n But its not error 400.');
          }
        });
      }

      navigate(`/`);
    },
    [competitionId, navigate]
  );

  const downloadData = useCallback(async () => {
    await fetch(`${IP_ADDRESS}/experience/${competitionId}`, {
      credentials: 'include',
    })
    .then((res) => {
      if (res.status === 401) {
        navigate("/login");
      }
      return res;
    })
      .then((res) => res.json())
      .then((res) => {
        const experience = res as unknown as any;

        const newAwards: Award[] = [];
        for (const award of experience.awards) {
          newAwards.push({
            awardId: award.award_id,
            type: AwardType[award.type as keyof typeof AwardType],
            description: award.description
          });
        }
        experience.awards = newAwards;

        setCompetition(experience);
      });
  }, [competitionId]);

  useEffect(() => {
    downloadData();
  }, [downloadData]);

  if (!competition) {
    return <></>;
  }

  return (
    <CompetitionChangeForm competition={competition} onSubmit={onSubmit} />
  );
};

export default EditCompetition;
