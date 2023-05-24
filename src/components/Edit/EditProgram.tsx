import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavigateFunction, useParams } from 'react-router-dom';
import { IP_ADDRESS } from '../../Global';
import ProgramChangeForm from '../Forms/ProgramChangeForm';
import { Focus, Program, ProgramFocus, ProgramType } from '../../program';

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

const EditProgram = () => {
  const params = useParams();
  const navigate = useNavigate();
  const programId = Number(params['programId']);
  const [program, setProgram] = useState<Program>();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const program_data = {
        program_id: programId,
        program_type: event.currentTarget['Type'].value,
        monthly_fee: event.currentTarget['monthly_fee'].value,
        time_commitment: event.currentTarget['time_commitment'].value
      };
      const programRequestOptions: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rowId: programId,
          tableName: 'program',
          data: program_data
        })
      };

      const isTheoretical = event.currentTarget['theoretical_checkbox'].checked;
      const isPractical = event.currentTarget['practical_checkbox'].checked;

      await fetch(`${IP_ADDRESS}/update`, programRequestOptions).then((res) => {
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
          tableName: 'program_focus',
          rowName: 'program_id',
          rowId: programId
        })
      });

      if (isTheoretical) {
        sendFocus(programId, 'THEORETICAL', navigate);
      }

      if (isPractical) {
        sendFocus(programId, 'PRACTICAL', navigate);
      }

      navigate(`/`);
    },
    [navigate, programId]
  );

  const downloadData = useCallback(async () => {
    await fetch(`${IP_ADDRESS}/experience/${programId}`, {
      credentials: 'include'
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

        experience.program_type =
          ProgramType[experience.program_type as keyof typeof ProgramType];

        const newFocuses: ProgramFocus[] = [];
        for (const focus of experience.program_focuses) {
          newFocuses.push({ focus: Focus[focus.focus as keyof typeof Focus] });
        }
        experience.program_focuses = newFocuses;

        setProgram(experience);
      });
  }, [programId]);

  useEffect(() => {
    downloadData();
  }, [downloadData]);

  if (!program) {
    return <></>;
  }

  return <ProgramChangeForm program={program} onSubmit={onSubmit} />;
};

export default EditProgram;
