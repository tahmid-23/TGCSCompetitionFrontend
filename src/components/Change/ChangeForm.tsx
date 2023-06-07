import { FormEventHandler, useState } from 'react';
import GradeSelection from '../Search/GradeSelection';
import TopicSelection from '../Search/TopicSelection';
import {
  Category,
  Experience,
  ExperienceType,
  Grade,
  ParticipantCount
} from '../../api/model/experience';
import Dropdown from '../InputComponents/Dropdown/Dropdown';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';

interface ChangeFormProps {
  experience?: Experience;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const ChangeForm = ({ experience, onSubmit }: ChangeFormProps) => {
  const [grades, setGrades] = useState<Grade[]>(
    experience?.grades.map((grade) => grade.grade) || []
  );
  const [topics, setTopics] = useState<Category[]>(
    experience?.categories.map((category) => category.category) || []
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
        <TextField
          id="name"
          label="Name"
          variant="standard"
          defaultValue={experience?.name}
          required
        />
        <TextField
          id="url"
          label="Website URL"
          variant="standard"
          type="url"
          defaultValue={experience?.website_url}
        />
        <TextField
          id="fee"
          label="Entry Fee"
          variant="standard"
          type="number"
          InputProps={{
            inputProps: { min: 0 }
          }}
          defaultValue={experience?.entry_fee ?? 0}
          required
        />
        <Dropdown
          id="participant_count"
          name="participant_count"
          label="Participant Count"
          minWidth="15vw"
          defaultChoice={
            experience?.participant_count &&
            ParticipantCount[experience.participant_count]
          }
          items={[
            ParticipantCount[ParticipantCount['1-10']],
            ParticipantCount[ParticipantCount['11-50']],
            ParticipantCount[ParticipantCount['51-99']],
            ParticipantCount[ParticipantCount['100+']]
          ]}
        />
        <TextField
          id="origin_year"
          label="Origin Year"
          variant="standard"
          type="number"
          InputProps={{
            inputProps: {
              min: 1700,
              interval: '1'
            }
          }}
          defaultValue={experience?.origin_year}
        />
        <TextField
          id="purpose"
          label="Purpose"
          variant="standard"
          defaultValue={experience?.name}
        />
        <TextField
          id="description"
          label="Description"
          variant="standard"
          defaultValue={experience?.description}
          required
        />
        <TextField
          id="required_items"
          label="Required Items"
          variant="standard"
          defaultValue={experience?.required_items}
        />
        <TextField
          id="advice"
          label="Advice"
          variant="standard"
          defaultValue={experience?.advice}
        />
        <TextField
          id="time_score"
          label="Time Score"
          variant="standard"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              max: 10,
              interval: '1'
            }
          }}
          defaultValue={experience?.score_time}
          required
        />
        <TextField
          id="difficulty_score"
          label="Difficulty Score"
          variant="standard"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              max: 10,
              interval: '1'
            }
          }}
          defaultValue={experience?.score_difficulty}
          required
        />
        <TextField
          id="benefit_score"
          label="Benefit Score"
          variant="standard"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              max: 10,
              interval: '1'
            }
          }}
          defaultValue={experience?.score_benefit}
          required
        />
        <TextField
          id="management_score"
          label="Management Score"
          variant="standard"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              max: 10,
              interval: '1'
            }
          }}
          defaultValue={experience?.score_mgmt}
          required
        />
        <Typography>Type</Typography>
        <RadioGroup
          name="Type"
          defaultValue={
            experience?.type !== undefined
              ? experience.type === ExperienceType.COMPETITION
                ? 'Competition'
                : 'Program'
              : undefined
          }
          row
        >
          <FormControlLabel
            label="Competition"
            control={
              <Radio id="competition_button" value="Competition" required />
            }
          />
          <FormControlLabel
            label="Program"
            control={<Radio id="program_button" value="Program" required />}
          />
        </RadioGroup>
        <FormControlLabel
          label="Virtual"
          control={
            <Checkbox name="virtual" defaultChecked={experience?.virtual} />
          }
        />
        <TextField
          id="address"
          label="Address"
          variant="standard"
          defaultValue={experience?.address}
        />
        <TextField
          id="prerequisite_description"
          label="Prerequisite Description"
          variant="standard"
          defaultValue={experience?.prerequisite_description}
        />
        <TextField
          id="entry_description"
          label="Entry Description"
          variant="standard"
          defaultValue={experience?.entry_description}
        />
        <Typography>Grades</Typography>
        <div>
          <GradeSelection grades={grades} onGradeChange={setGrades} />
        </div>
        <Typography>Categories</Typography>
        <TopicSelection topics={topics} onTopicChange={setTopics} />
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Stack>
    </form>
  );
};

export default ChangeForm;
