import { PropsWithChildren } from 'react';
import {
  Experience,
  Grade,
  ParticipantCount,
  getCategoryDisplay,
  getExperienceTypeDisplay
} from '../../../api/model/experience';
import styles from './ExperienceOverview.module.css';
import { Button, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectLogin } from '../../../features/login';
import { useNavigate } from 'react-router-dom';
import { remove } from '../../../api/api';

interface ExperienceOverviewProps {
  experience: Experience;
}

const ExperienceOverview = ({
  experience,
  children
}: PropsWithChildren<ExperienceOverviewProps>) => {
  const loginState = useAppSelector(selectLogin);
  const navigate = useNavigate();

  return (
    <Stack className={styles.wrapper} spacing={1} sx={{ margin: 0 }}>
      <div>
        <Typography variant="h3">{experience.name}</Typography>
      </div>
      {loginState.admin && (
        <div>
          <Button
            onClick={() => navigate(`/edit/${experience.experience_id}`)}
            variant="contained"
          >
            Edit
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to delete this competition?'
                )
              ) {
                remove(
                  'experience',
                  'experience_id',
                  experience.experience_id,
                  () => {
                    navigate('/login');
                  }
                )
                  .catch((err) => {
                    console.error(err);
                    alert('An error occurred!');
                  })
                  .finally(() => {
                    navigate('/');
                  });
              }
            }}
            variant="contained"
          >
            Delete
          </Button>
        </div>
      )}
      <div>
        <Typography>
          Type: {getExperienceTypeDisplay(experience.type)}
        </Typography>
      </div>
      {experience.website_url && (
        <div>
          <Typography component="span">Website URL:</Typography>
          &nbsp;
          <Typography component="a" href={experience.website_url}>
            {experience.website_url}
          </Typography>
        </div>
      )}
      <div>
        <Typography>Entry Fee: ${experience.entry_fee}</Typography>
      </div>
      <div>
        <Typography>
          Grades:{' '}
          {experience.grades.map((grade) => Grade[grade.grade]).join(', ')}
        </Typography>
      </div>
      <div>
        <Typography>
          Categories:{' '}
          {experience.categories
            .map((category) => getCategoryDisplay(category.category))
            .join(', ')}
        </Typography>
      </div>
      {experience.participant_count !== undefined && (
        <div>
          <Typography>
            Participant count: {ParticipantCount[experience.participant_count]}
          </Typography>
        </div>
      )}
      {experience.origin_year && (
        <div>
          <Typography>Origin Year: {experience.origin_year}</Typography>
        </div>
      )}
      {experience.purpose && (
        <div>
          <Typography>Purpose: {experience.purpose}</Typography>
        </div>
      )}
      <div>
        <Typography>Description: {experience.description}</Typography>
      </div>
      {experience.required_items && (
        <div>
          <Typography>Required Items: {experience.required_items}</Typography>
        </div>
      )}
      {experience.advice && (
        <div>
          <Typography>Advice: {experience.advice}</Typography>
        </div>
      )}
      {experience.virtual !== undefined && (
        <div>
          <Typography>
            Virtual: {experience.virtual ? 'True' : 'False'}
          </Typography>
        </div>
      )}
      {experience.entry_description && (
        <div>
          <Typography>
            Entry Description: {experience.entry_description}
          </Typography>
        </div>
      )}
      {children}
    </Stack>
  );
};

export default ExperienceOverview;
