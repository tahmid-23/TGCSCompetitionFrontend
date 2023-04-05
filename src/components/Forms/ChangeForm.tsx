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
import { Experience, ExperienceType, ParticipantCount } from '../../experience';

export interface ChangeFormProps {
  experience?: Experience;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const ChangeForm = ({ experience, onSubmit }: ChangeFormProps) => {
  const d: Date = new Date();
  const year = String(d.getFullYear());
  return (
    <>
      <form onSubmit={onSubmit}>
        <TextBox name="Name" id="name" value={experience?.name} />
        <br />
        <URLBox name="Website URL" id="url" value={experience?.website_url} />
        <br />
        <NumberBox
          name="Entry Fee"
          id="fee"
          min="0"
          value={experience?.entry_fee}
        />
        <br />
        <Dropdown
          name="Participant Count"
          id="participant_count"
          value={experience?.participant_count}
          items={[
            ParticipantCount['1-10'],
            ParticipantCount['11-50'],
            ParticipantCount['51-99'],
            ParticipantCount['100+']
          ]}
        />
        <br />
        <NumberBox
          name="Origin Year"
          id="origin_year"
          min="1700"
          max={year}
          interval="1"
          value={experience?.origin_year}
        />
        <br />
        <TextBox name="Purpose" id="purpose" value={experience?.purpose} />
        <br />
        <TextBox
          name="Description"
          id="description"
          value={experience?.description}
        />
        <br />
        <TextBox
          name="Required Items"
          id="required_items"
          value={experience?.required_items}
        />
        <br />
        <TextBox name="Advice" id="advice" value={experience?.advice} />
        <br />
        <NumberBox
          name="Time Score"
          id="time_score"
          min="0"
          max="10"
          interval="1"
          value={experience?.score_time}
        />
        <br />
        <NumberBox
          name="Difficulty Score"
          id="difficulty_score"
          min="0"
          max="10"
          interval="1"
          value={experience?.score_difficulty}
        />
        <br />
        <NumberBox
          name="Benefit Score"
          id="benefit_score"
          min="0"
          max="10"
          interval="1"
          value={experience?.score_benefit}
        />
        <br />
        <NumberBox
          name="Management Score"
          id="management_score"
          min="0"
          max="10"
          interval="1"
          value={experience?.score_mgmt}
        />
        <br />
        <p>Type</p>
        <MultipleChoice
          name="Type"
          value="Competition"
          id="competition_button"
          checked={experience?.type === ExperienceType.COMPETITION}
        />
        <MultipleChoice
          name="Type"
          value="Program"
          id="program_button"
          checked={experience?.type === ExperienceType.PROGRAM}
        />
        <br />
        <CheckBox name="Virtual" id="virtual" checked={experience?.virtual} />
        <br />
        <TextBox name="Address" id="address" value={experience?.address} />
        <br />
        <TextBox
          name="Prerequisite Description"
          id="prerequisite_description"
          value={experience?.prerequisite_description}
        />
        <br />
        <TextBox
          name="Entry Description"
          id="entry_description"
          value={experience?.entry_description}
        />
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
        <TextBox
          name="Description"
          id="descrption"
          value={experience?.description}
        />
        <br />
        <br />
        <input type="submit" value="Next" />
      </form>
    </>
  );
};

export default ChangeForm;
