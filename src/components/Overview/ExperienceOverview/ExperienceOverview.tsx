import { PropsWithChildren } from 'react';
import {
  Experience,
  Grade,
  ParticipantCount,
  getCategoryDisplay,
  getExperienceTypeDisplay
} from '../../../api/model/experience';
import QuickNavigation from '../../QuickNavigation/QuickNavigation';
import styles from './ExperienceOverview.module.css';
import { Stack, Typography } from '@mui/material';

interface ExperienceOverviewProps {
  experience: Experience;
}

const ExperienceOverview = ({
  experience,
  children
}: PropsWithChildren<ExperienceOverviewProps>) => {
  return (
    <Stack className={styles.wrapper} spacing={1} sx={{ margin: 0 }}>
      <div>
        <Typography variant="h3">{experience.name}</Typography>
      </div>
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
      {experience.participant_count && (
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
      <QuickNavigation />
    </Stack>
  );
};

export default ExperienceOverview;
