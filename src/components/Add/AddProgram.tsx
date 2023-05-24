import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { IP_ADDRESS } from '../../Global';
import ProgramChangeForm from '../Forms/ProgramChangeForm';

async function onSubmit(
  experienceId: number,
  navigate: NavigateFunction,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  const program_data = {
    program_id: experienceId,
    program_type: event.currentTarget['Type'].value,
    monthly_fee: event.currentTarget['monthly_fee'].value,
    time_commitment: event.currentTarget['time_commitment'].value
  };
  const programRequestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tableName: 'program', data: program_data })
  };

  const isTheoretical = event.currentTarget['theoretical_checkbox'].checked;
  const isPractical = event.currentTarget['practical_checkbox'].checked;

  await fetch(`${IP_ADDRESS}/insert`, programRequestOptions).then((res) => {
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

  if (isTheoretical) {
    sendFocus(experienceId, 'THEORETICAL', navigate);
  }

  if (isPractical) {
    sendFocus(experienceId, 'PRACTICAL', navigate);
  }

  navigate(`/`);
}

async function sendFocus(experienceId: number, focus: string, navigate: NavigateFunction) {
  const focus_data = {
    program_id: experienceId,
    focus: focus
  };
  const focusRequestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tableName: 'program_focus', data: focus_data })
  };
  await fetch(`${IP_ADDRESS}/insert`, focusRequestOptions).then((res) => {
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

const AddProgram = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <ProgramChangeForm
      onSubmit={(e) => onSubmit(Number(params['experienceId']), navigate, e)}
    />
  );
};

export default AddProgram;
