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
        // backgroundColor: theme.palette.primary.light,
        padding: 0,
        border: `0.5vh solid ${theme.palette.primary.dark}`
      }}
    >
      {listItems}
    </List>
  );
};
export default ExperienceList;
