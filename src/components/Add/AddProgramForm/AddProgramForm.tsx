import { FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import ProgramChangeForm from '../../Change/ProgramChangeForm/ProgramChangeForm';
import { insert } from '../../../api/api';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectLogin } from '../../../features/login';
import { Focus } from '../../../api/model/program';

const AddProgramForm = () => {
  const loginState = useAppSelector(selectLogin);
  const params = useParams();
  const navigate = useNavigate();

  const programId = Number(params['programId']);

  const sendFocus = useCallback(
    async (focus: Focus) => {
      const focusData = {
        program_id: programId,
        focus: Focus[focus]
      };
      await insert('program_focus', focusData, () => navigate('/login')).catch(
        (err) => {
          console.error(err);
          throw Error('Something went wrong!');
        }
      );
    },
    [navigate, programId]
  );

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const programData = {
        program_id: programId,
        program_type: event.currentTarget['Type'].value,
        monthly_fee: event.currentTarget['monthly_fee'].value,
        time_commitment: event.currentTarget['time_commitment'].value
      };

      const isTheoretical = event.currentTarget['theoretical_checkbox'].checked;
      const isPractical = event.currentTarget['practical_checkbox'].checked;

      await insert('program', programData, () => navigate('/login')).catch(
        (err) => {
          console.error(err);
          throw Error('Something went wrong!');
        }
      );

      if (isTheoretical) {
        await sendFocus(Focus.THEORETICAL).catch((err) => {
          console.error(err);
          throw Error('Something went wrong!');
        });
      }

      if (isPractical) {
        await sendFocus(Focus.PRACTICAL).catch((err) => {
          console.error(err);
          throw Error('Something went wrong!');
        });
      }

      navigate(`/`);
    },
    [navigate, programId, sendFocus]
  );

  if (!loginState.admin) {
    navigate('/');
    return <></>;
  }

  return <ProgramChangeForm onSubmit={(e) => onSubmit(e).catch(alert)} />;
};

export default AddProgramForm;
