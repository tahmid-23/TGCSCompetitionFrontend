import { FormEventHandler } from 'react';
import DateBox from '../InputComponents/DateBox';
import MultipleChoice from '../InputComponents/MultipleChoice';
import MultipleSelect from '../InputComponents/MultipleSelect';
import NumberBox from '../InputComponents/NumberBox';

interface ProgramAddFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const ProgramAddForm: React.FC<ProgramAddFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <MultipleChoice
        name="Type"
        id="program_type_intern"
        value="Intern"
      ></MultipleChoice>
      <MultipleChoice
        name="Type"
        id="program_type_presentation"
        value="Presentation"
      ></MultipleChoice>
      <MultipleChoice
        name="Type"
        id="program_type_research"
        value="Research"
      ></MultipleChoice>
      <MultipleChoice
        name="Type"
        id="program_type_academic"
        value="Academic"
      ></MultipleChoice>
      <br></br>
      <MultipleSelect
        name="theoretical_checkbox"
        value="Theoretical"
      ></MultipleSelect>
      <MultipleSelect
        name="practical_checkbox"
        value="Practical"
      ></MultipleSelect>
      <br></br>
      <NumberBox name="Monthly Fee" id="monthly_fee"></NumberBox>
      <br></br>
      <NumberBox name="Time Commitment" id="time_commitment"></NumberBox>
      <br></br>
      <DateBox name="Application Due Date" id="due_date"></DateBox>
      <br></br>
      <br></br>
      <input type="submit" value="Add Program"></input>
    </form>
  );
};

export default ProgramAddForm;
