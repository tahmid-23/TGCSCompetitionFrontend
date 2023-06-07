import { FormEvent, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompetitionChangeForm from '../../Change/CompetitionChangeForm/CompetitionChangeForm';
import { insert } from '../../../api/api';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectLogin } from '../../../features/login';

const AddCompetitionForm = () => {
  const loginState = useAppSelector(selectLogin);
  const params = useParams();
  const navigate = useNavigate();

  const competitionId = Number(params['competitionId']);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>, uuids: string[]) => {
      e.preventDefault();
      const judgeData = {
        competition_id: competitionId,
        judges_description: e.currentTarget['judge_description'].value,
        judging_criteria: e.currentTarget['judge_criteria'].value
      };
      const awardData = [];
      for (const uuid of uuids) {
        awardData.push({
          competition_id: competitionId,
          type: e.currentTarget[`award${uuid}`].value,
          description: e.currentTarget[`award_description${uuid}`].value
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
    },
    [competitionId, navigate]
  );

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
      onSubmit={(e, uuids) => onSubmit(e, uuids).catch(alert)}
    />
  );
};

export default AddCompetitionForm;
