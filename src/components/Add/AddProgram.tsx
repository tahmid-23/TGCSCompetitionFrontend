import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import ProgramChangeForm from '../Forms/ProgramChangeForm';
import { insert } from '../../api/api';

async function onSubmit(
  experienceId: number,
  navigate: NavigateFunction,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  const programData = {
    program_id: experienceId,
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
    sendFocus(experienceId, 'THEORETICAL', navigate);
  }

  if (isPractical) {
    sendFocus(experienceId, 'PRACTICAL', navigate);
  }

  navigate(`/`);
}

async function sendFocus(
  experienceId: number,
  focus: string,
  navigate: NavigateFunction
) {
  const focusData = {
    program_id: experienceId,
    focus: focus
  };
  await insert('program_focus', focusData, () => navigate('/login')).catch(
    (err) => {
      console.error(err);
      throw Error('Something went wrong!');
    }
  );
}

const AddProgram = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <ProgramChangeForm
      onSubmit={(e) =>
        onSubmit(Number(params['experienceId']), navigate, e).catch(alert)
      }
    />
  );
};

export default AddProgram;
