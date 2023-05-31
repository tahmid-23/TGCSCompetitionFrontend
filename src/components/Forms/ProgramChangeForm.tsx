import { FormEventHandler } from 'react';
import MultipleChoice from '../InputComponents/MultipleChoice';
import MultipleSelect from '../InputComponents/MultipleSelect';
import NumberBox from '../InputComponents/NumberBox';
import { Focus, Program, ProgramType } from '../../api/model/program';

interface ProgramAddFormProps {
  program?: Program;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const ProgramChangeForm = ({ program, onSubmit }: ProgramAddFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <MultipleChoice
        name="Type"
        id="program_type_intern"
        value="Intern"
        checked={program?.program_type === ProgramType.INTERN}
      />
      <MultipleChoice
        name="Type"
        id="program_type_presentation"
        value="Presentation"
        checked={program?.program_type === ProgramType.PRESENTATION}
      />
      <MultipleChoice
        name="Type"
        id="program_type_research"
        value="Research"
        checked={program?.program_type === ProgramType.RESEARCH}
      />
      <MultipleChoice
        name="Type"
        id="program_type_academic"
        value="Academic"
        checked={program?.program_type === ProgramType.ACADEMIC}
      />
      <br />
      <MultipleSelect
        name="theoretical_checkbox"
        value={Focus[Focus.THEORETICAL]}
        label="Theoretical"
        defaultChecked={
          program?.program_focuses.find(
            (focus) => focus.focus === Focus.THEORETICAL
          ) !== undefined
        }
      />
      <MultipleSelect
        name="practical_checkbox"
        value={Focus[Focus.PRACTICAL]}
        label="Practical"
        defaultChecked={
          program?.program_focuses.find(
            (focus) => focus.focus === Focus.PRACTICAL
          ) !== undefined
        }
      />
      <br />
      <NumberBox
        name="Monthly Fee"
        id="monthly_fee"
        value={program?.monthly_fee}
      />
      <br />
      <NumberBox
        name="Time Commitment"
        id="time_commitment"
        value={program?.time_commitment}
      />
      <br />
      <br />
      <input type="submit" value="Add Program" />
    </form>
  );
};

export default ProgramChangeForm;
