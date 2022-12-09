import { FormEvent } from 'react';
import {
  NavigateFunction,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { IP_ADDRESS } from '../../global';
import ProgramAddForm from '../Forms/ProgramAddForm';

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
  const programRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tableName: 'program', data: program_data })
  };

  await fetch(`${IP_ADDRESS}/insert`, programRequestOptions).then((res) => {
    if (res.status === 400) {
      alert('Something went wrong!');
    } else if (res.status === 200 || res.status === 204) {
      alert('Success!');
      return res.json();
    } else {
      alert('We have no idea what went wrong\n But its not error 400.');
    }
  });

  navigate(`/`);
}

const AddProgram = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <ProgramAddForm
      onSubmit={(e) =>
        onSubmit(Number(searchParams.get('experienceId')), navigate, e)
      }
    ></ProgramAddForm>
  );
};

export default AddProgram;
