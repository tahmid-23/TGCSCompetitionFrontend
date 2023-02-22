import { FormEventHandler } from 'react';
import CheckBox from '../InputComponents/CheckBox';
import DateBox from '../InputComponents/DateBox';
import Dropdown from '../InputComponents/Dropdown';
import MultipleChoice from '../InputComponents/MultipleChoice';
import NumberBox from '../InputComponents/NumberBox';
import TextBox from '../InputComponents/TextBox';
import URLBox from '../InputComponents/URLBox';
import GradeFilter from '../Search/GradeFilter';
import TopicFilter from '../Search/TopicFilter';

export interface AddFormProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const AddForm = ({ onSubmit }: AddFormProps) => {
  const d: Date = new Date();
  const year = String(d.getFullYear());
  return (
    <>
      <form onSubmit={onSubmit}>
        <p>This is the add page</p>
        <TextBox name="Name" id="name" />
        <br />
        <NumberBox name="Id" id="id" min="1" interval="1" />
        <br />
        <URLBox name="Website URL" id="url" />
        <br />
        <NumberBox name="Entry Fee" id="fee" min="0" />
        <br />
        <Dropdown
          name="Participant Count"
          id="participant_count"
          items={['1-10', '11-50', '51-99', '100+']}
        />
        <br />
        <NumberBox
          name="Origin Year"
          id="origin_year"
          min="1700"
          max={year}
          interval="1"
        />
        <br />
        <TextBox name="Purpose" id="purpose" />
        <br />
        <TextBox name="Description" id="description" />
        <br />
        <TextBox name="Required Items" id="required_items" />
        <br />
        <TextBox name="Advice" id="advice" />
        <br />
        <NumberBox
          name="Time Score"
          id="time_score"
          min="0"
          max="10"
          interval="1"
        />
        <br />
        <NumberBox
          name="Difficulty Score"
          id="difficulty_score"
          min="0"
          max="10"
          interval="1"
        />
        <br />
        <NumberBox
          name="Benefit Score"
          id="benefit_score"
          min="0"
          max="10"
          interval="1"
        />
        <br />
        <NumberBox
          name="Management Score"
          id="management_score"
          min="0"
          max="10"
          interval="1"
        />
        <br />
        <p>Type</p>
        <MultipleChoice
          name="Type"
          value="Competition"
          id="competition_button"
        />
        <MultipleChoice name="Type" value="Program" id="program_button" />
        <br />
        <CheckBox name="Virtual" id="virtual" />
        <br />
        <TextBox name="Address" id="address" />
        <br />
        <TextBox
          name="Prerequisite Description"
          id="prerequisite_description"
        />
        <br />
        <TextBox name="Entry Description" id="entry_description" />
        <br />
        <p>Grades</p>
        <GradeFilter />
        <br />
        <p>Categories</p>
        <TopicFilter />
        <br />
        <br />
        <DateBox name="Important Dates" id="important_dates" />
        &nbsp; &nbsp; &nbsp; &nbsp;
        <TextBox name="Description" id="descrption" />
        <br />
        <br />
        <input type="submit" value="Next" />
      </form>
    </>
  );
};

export default AddForm;
