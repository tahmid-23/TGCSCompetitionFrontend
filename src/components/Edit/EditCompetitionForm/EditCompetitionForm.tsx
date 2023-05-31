import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompetitionChangeForm from '../../Change/CompetitionChangeForm/CompetitionChangeForm';
import { Competition } from '../../../api/model/competition';
import { getExperience, insert, remove, update } from '../../../api/api';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectLogin } from '../../../features/login';
import { useRefreshLoginState } from '../../../hooks/login-hooks';

const EditCompetitionForm = () => {
  const loginState = useAppSelector(selectLogin);
  const params = useParams();
  const navigate = useNavigate();
  const competitionId = Number(params['competitionId']);
  const [competition, setCompetition] = useState<Competition>();
  const refreshed = useRefreshLoginState();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const judgeData = {
        competition_id: competitionId,
        judges_description: event.currentTarget['judge_description'].value,
        judging_criteria: event.currentTarget['judge_criteria'].value
      };
      const awardData = [];
      for (let i = 0; event.currentTarget[`award${i}`]; i++) {
        awardData.push({
          competition_id: competitionId,
          type: String(event.currentTarget[`award${i}`].value).toUpperCase(),
          description: event.currentTarget[`award_description${i}`].value
        });
      }

      await update('competition', competitionId, judgeData, () =>
        navigate('/login')
      ).catch((err) => {
        console.error(err);
        throw new Error('Something went wrong!');
      });

      await remove('competition', 'competition_id', competitionId, () =>
        navigate('/login')
      ).catch((err) => {
        console.error(err);
        throw new Error('Something went wrong!');
      });

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
    if (refreshed) {
      downloadData();
    }
  }, [downloadData, loginState.admin, navigate, refreshed]);

  if (!refreshed) {
    return <></>;
  }

  if (!loginState.admin) {
    navigate('/');
    return <></>;
  }

  if (!competition) {
    return <></>;
  }

  return (
    <CompetitionChangeForm
      competition={competition}
      onSubmit={(e) => onSubmit(e).catch(alert)}
    />
  );
};

export default EditCompetitionForm;
