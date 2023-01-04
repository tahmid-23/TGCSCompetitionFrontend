import { FormEventHandler } from 'react';
import Dropdown from '../InputComponents/Dropdown';
import CheckBox from '../InputComponents/CheckBox';
import DateBox from '../InputComponents/DateBox';
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
        <TextBox name="Name" id="name"></TextBox>
        <br></br>
        <NumberBox name="Id" id="id" min="1" interval="1"></NumberBox>
        <br></br>
        <URLBox name="Website URL" id="url"></URLBox>
        <br></br>
        <NumberBox name="Entry Fee" id="fee" min="0"></NumberBox>
        <br></br>
        <Dropdown
          name="Participant Count"
          id="participant_count"
          items={['1-10', '11-50', '51-99', '100+']}
        ></Dropdown>
        <br></br>
        <NumberBox
          name="Origin Year"
          id="origin_year"
          min="1700"
          max={year}
          interval="1"
        ></NumberBox>
        <br></br>
        <TextBox name="Purpose" id="purpose"></TextBox>
        <br></br>
        <TextBox name="Description" id="description"></TextBox>
        <br></br>
        <TextBox name="Required Items" id="required_items"></TextBox>
        <br></br>
        <TextBox name="Advice" id="advice"></TextBox>
        <br></br>
        <NumberBox
          name="Time Score"
          id="time_score"
          min="0"
          max="10"
          interval="1"
        ></NumberBox>
        <br></br>
        <NumberBox
          name="Difficulty Score"
          id="difficulty_score"
          min="0"
          max="10"
          interval="1"
        ></NumberBox>
        <br></br>
        <NumberBox
          name="Benefit Score"
          id="benefit_score"
          min="0"
          max="10"
          interval="1"
        ></NumberBox>
        <br></br>
        <NumberBox
          name="Management Score"
          id="management_score"
          min="0"
          max="10"
          interval="1"
        ></NumberBox>
        <br></br>
        <p>Type</p>
        <MultipleChoice
          name="Type"
          value="Competition"
          id="competition_button"
        ></MultipleChoice>
        <MultipleChoice
          name="Type"
          value="Program"
          id="program_button"
        ></MultipleChoice>
        <br></br>
        <CheckBox name="Virtual" id="virtual"></CheckBox>
        <br></br>
        <TextBox name="Address" id="address"></TextBox>
        <br></br>
        <DateBox name="Start Date" id="start_date"></DateBox>
        <br></br>
        <DateBox name="End Date" id="end_date"></DateBox>
        <br></br>
        <TextBox
          name="Prerequisite Description"
          id="prerequisite_description"
        ></TextBox>
        <br></br>
        <TextBox name="Entry Description" id="entry_description"></TextBox>
        <br></br>
        <p>Grades</p>
        <GradeFilter></GradeFilter>
        <br></br>
        <p>Categories</p>
        <TopicFilter></TopicFilter>
        <br></br>
        <br></br>
        <DateBox name="Important Dates" id="important_dates"></DateBox>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <TextBox name="Description" id="descrption"></TextBox>
        <br></br>
        <br></br>
        <input type="submit" value="Next"></input>
      </form>
    </>
  );
};

export default AddForm;
