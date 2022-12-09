import { FormEventHandler } from 'react';
import MultipleChoice from '../InputComponents/MultipleChoice';
import NumberBox from '../InputComponents/NumberBox';

interface ProgramAddFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const ProgramAddForm: React.FC<ProgramAddFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <MultipleChoice
        name="Type"
        id="program_type"
        value="Intern"
      ></MultipleChoice>
      <MultipleChoice
        name="Type"
        id="program_type"
        value="Presentation"
      ></MultipleChoice>
      <MultipleChoice
        name="Type"
        id="program_type"
        value="Research"
      ></MultipleChoice>
      <MultipleChoice
        name="Type"
        id="program_type"
        value="Academic"
      ></MultipleChoice>
      <br></br>
      <NumberBox name="Monthly Fee" id="monthly_fee"></NumberBox>
      <br></br>
      <NumberBox name="Time Commitment" id="time_commitment"></NumberBox>
      <br></br>
      <br></br>
      <input type="submit" value="Add Program"></input>
    </form>
  );
};

export default ProgramAddForm;
