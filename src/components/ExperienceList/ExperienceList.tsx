import { Experience } from '../../api/model/experience';
import { List, Typography, useTheme } from '@mui/material';
import ExperienceItem from '../ExperienceItem/ExperienceItem';

export type Filter = (arg0: Experience) => boolean;

interface ExperienceListProps {
  experiences: Experience[];
  filter?: Filter;
  highlightId?: number;
  onSelect?: (arg0: number | undefined) => void;
  onDelete?: (arg0: number) => void;
}

const ExperienceList = ({
  experiences,
  filter,
  highlightId,
  onSelect,
  onDelete
}: ExperienceListProps) => {
  const theme = useTheme();

  const filteredExperiences = experiences.filter((experience, index) => {
    if (!filter || filter(experience)) {
      return true;
    }

    if (experience.experience_id === index) {
      onSelect?.(undefined);
    }

    return false;
  });

  if (filteredExperiences.length === 0) {
    return <Typography>No matches found.</Typography>;
  }

  return (
    <List
      sx={{
        // backgroundColor: theme.palette.primary.light,
        padding: 0,
        border: `0.5vh solid ${theme.palette.primary.dark}`
      }}
    >
      {filteredExperiences.map((experience) => {
        return (
          <ExperienceItem
            key={experience.experience_id}
            experience={experience}
            highlightId={highlightId}
            onSelect={(selected) =>
              onSelect?.(selected ? experience.experience_id : undefined)
            }
            onDelete={() => onDelete?.(experience.experience_id)}
          />
        );
      })}
    </List>
  );
};
export default ExperienceList;
