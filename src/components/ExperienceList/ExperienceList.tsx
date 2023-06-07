import { Experience } from '../../api/model/experience';
import { Divider, List, Typography, useTheme } from '@mui/material';
import ExperienceItem from '../ExperienceItem/ExperienceItem';
import { ReactElement, memo, useCallback } from 'react';

export type Filter = (arg0: Experience) => boolean;

interface ExperienceItemWrapperProps {
  experience: Experience;
  highlightId?: number;
  onSelect?: (arg0: number | undefined) => void;
  onDelete?: (arg0: number) => void;
}

const ExperienceItemWrapper = ({
  experience,
  highlightId,
  onSelect,
  onDelete
}: ExperienceItemWrapperProps) => {
  const onItemSelect = useCallback(
    (selected: boolean) =>
      onSelect?.(selected ? experience.experience_id : undefined),
    [experience.experience_id, onSelect]
  );

  const onItemDelete = useCallback(
    () => onDelete?.(experience.experience_id),
    [experience.experience_id, onDelete]
  );

  return (
    <ExperienceItem
      key={experience.experience_id}
      experience={experience}
      highlightId={highlightId}
      onSelect={onItemSelect}
      onDelete={onItemDelete}
    />
  );
};

const MemoizedExperienceItemWrapper = memo(ExperienceItemWrapper);

interface ExperienceListProps {
  experiences: Experience[];
  recommendations?: Record<number, number>;
  filter?: Filter;
  keyword?: string;
  highlightId?: number;
  onSelect?: (arg0: number | undefined) => void;
  onDelete?: (arg0: number) => void;
}

const ExperienceList = ({
  experiences,
  recommendations,
  filter,
  keyword,
  highlightId,
  onSelect,
  onDelete
}: ExperienceListProps) => {
  const theme = useTheme();

  const filteredExperiences = experiences.filter((experience) => {
    if (
      (!keyword ||
        experience.name.toLowerCase().includes(keyword?.toLowerCase())) &&
      (!filter || filter(experience))
    ) {
      return true;
    }

    if (experience.experience_id === highlightId) {
      onSelect?.(undefined);
    }

    return false;
  });

  if (filteredExperiences.length === 0) {
    return <Typography>No matches found.</Typography>;
  }

  filteredExperiences.sort((experienceA, experienceB) => {
    const ratingA = recommendations
      ? recommendations[experienceA.experience_id] ?? 5
      : 5;
    const ratingB = recommendations
      ? recommendations[experienceB.experience_id] ?? 5
      : 5;

    if (ratingA < ratingB) {
      return -1;
    }
    if (ratingA === ratingB) {
      return 0;
    }

    return 1;
  });

  const listItems: ReactElement[] = [];
  for (const experience of filteredExperiences) {
    listItems.push(
      <MemoizedExperienceItemWrapper
        key={experience.experience_id}
        experience={experience}
        highlightId={highlightId}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    );
    listItems.push(<Divider key={experience.experience_id + '-divider'} />);
  }
  listItems.pop();

  return (
    <List
      sx={{
        padding: 0,
        border: `0.25vh solid ${theme.palette.primary.dark}`
      }}
    >
      {listItems}
    </List>
  );
};
export default ExperienceList;
