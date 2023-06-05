import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompetitionChangeForm from '../../Change/CompetitionChangeForm/CompetitionChangeForm';
import { Competition } from '../../../api/model/competition';
import { getExperience, insert, remove } from '../../../api/api';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectLogin } from '../../../features/login';

const EditCompetitionForm = () => {
  const loginState = useAppSelector(selectLogin);
  const params = useParams();
  const navigate = useNavigate();
  const competitionId = Number(params['competitionId']);
  const [competition, setCompetition] = useState<Competition>();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>, uuids: string[]) => {
      event.preventDefault();
      const judgeData = {
        competition_id: competitionId,
        judges_description: event.currentTarget['judge_description'].value,
        judging_criteria: event.currentTarget['judge_criteria'].value
      };

      const awardData = [];
      for (const uuid of uuids) {
        console.log(event.currentTarget[`award${uuid}`]);
        awardData.push({
          competition_id: competitionId,
          type: event.currentTarget[`award${uuid}`].value,
          description: event.currentTarget[`award_description${uuid}`].value
        });
      }

      await remove('competition', 'competition_id', competitionId, () =>
        navigate('/login')
      ).catch((err) => {
        console.error(err);
        throw new Error('Something went wrong!');
      });

      await insert('competition', judgeData, () => navigate('/login')).catch(
        (err) => {
          console.error(err);
          throw new Error('Something went wrong!');
        }
      );

      for (const d of awardData) {
        await insert('award', d, () => navigate('/login')).catch((err) => {
          console.error(err);
          throw new Error('Something went wrong!');
        });
      }

      navigate(`/`);
    },
    [competitionId, navigate]
  );

  const downloadData = useCallback(async () => {
    await getExperience(competitionId, () => navigate('/login')).then(
      (experience) => setCompetition(experience as unknown as Competition)
    );
  }, [competitionId, navigate]);

  useEffect(() => {
    if (loginState.admin) {
      downloadData();
    } else {
      navigate('/');
    }
  }, [downloadData, loginState.admin, navigate]);

  if (!loginState.admin) {
    return <></>;
  }

  if (!competition) {
    return <></>;
  }

  return (
    <CompetitionChangeForm
      competition={competition}
      onSubmit={(e, uuids) => onSubmit(e, uuids).catch(alert)}
    />
  );
};

export default EditCompetitionForm;
