import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavigateFunction, useParams } from 'react-router-dom';
import ProgramChangeForm from '../Forms/ProgramChangeForm';
import { Program } from '../../api/model/program';
import { getExperience, insert, remove, update } from '../../api/api';

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

const EditProgram = () => {
  const params = useParams();
  const navigate = useNavigate();
  const programId = Number(params['programId']);
  const [program, setProgram] = useState<Program>();

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

      await update('program', programId, programData, () =>
        navigate('/login')
      ).catch((err) => {
        console.error(err);
        throw new Error('Something went wrong!');
      });

      await remove('program_focus', 'program_id', programId, () =>
        navigate('/login')
      ).catch((err) => {
        console.error(err);
        throw new Error('Something went wrong!');
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
    await getExperience(programId, () => navigate('/login')).then(
      (experience) => setProgram(experience as unknown as Program)
    );
  }, [navigate, programId]);

  useEffect(() => {
    downloadData();
  }, [downloadData]);

  if (!program) {
    return <></>;
  }

  return (
    <ProgramChangeForm
      program={program}
      onSubmit={(e) => onSubmit(e).catch(alert)}
    />
  );
};

export default EditProgram;
