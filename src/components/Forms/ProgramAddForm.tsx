import { FormEventHandler } from 'react';
import DateBox from '../InputComponents/DateBox';
import MultipleChoice from '../InputComponents/MultipleChoice';
import MultipleSelect from '../InputComponents/MultipleSelect';
import NumberBox from '../InputComponents/NumberBox';

interface ProgramAddFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const ProgramAddForm = (
  {
    onSubmit
  }: ProgramAddFormProps
) => {
  return (
    <form onSubmit={onSubmit}>
      <MultipleChoice name="Type" id="program_type_intern" value="Intern" />
      <MultipleChoice
        name="Type"
        id="program_type_presentation"
        value="Presentation"
      />
      <MultipleChoice name="Type" id="program_type_research" value="Research" />
      <MultipleChoice name="Type" id="program_type_academic" value="Academic" />
      <br />
      <MultipleSelect name="theoretical_checkbox" value="Theoretical" />
      <MultipleSelect name="practical_checkbox" value="Practical" />
      <br />
      <NumberBox name="Monthly Fee" id="monthly_fee" />
      <br />
      <NumberBox name="Time Commitment" id="time_commitment" />
      <br />
      <DateBox name="Application Due Date" id="due_date" />
      <br />
      <br />
      <input type="submit" value="Add Program" />
    </form>
  );
};

export default ProgramAddForm;
