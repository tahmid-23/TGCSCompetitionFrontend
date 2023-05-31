import { MouseEventHandler, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import BulletedList from '../BulletedList/BulletedList';
import styles from './ExperienceList.module.css';
import { Category, Experience } from '../../api/model/experience';

interface ExperienceProps {
  experience: Experience;
  highlight: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const ExperienceItem = ({
  experience,
  highlight,
  onClick
}: ExperienceProps) => {
  const className = highlight ? styles.highlight : undefined;
  return (
    <div className={className} onClick={onClick}>
      <Link
        className={styles.experienceLink}
        to={`/view/${experience.experience_id}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {experience.name}
        &nbsp; (
        {experience.categories
          .map((category) => Category[category.category])
          .join(', ')}
        )
      </Link>
    </div>
  );
};

export type Filter = (arg0: Experience) => boolean;

interface ExperienceListProps {
  experiences: Experience[];
  filter?: Filter;
  highlightId?: number;
  onSelect?: (arg0: number | undefined) => void;
}

const ExperienceList = ({
  experiences,
  filter,
  highlightId,
  onSelect
}: ExperienceListProps) => {
  const validExp: ReactElement[] = [];
  for (let i = 0; i < experiences.length; ++i) {
    const experience = experiences[i];
    let shouldInclude;
    if (!filter) {
      shouldInclude = true;
    } else if (filter(experience)) {
      shouldInclude = true;
    } else {
      shouldInclude = false;
      if (experience.experience_id === highlightId) {
        onSelect?.(undefined);
      }
    }

    if (shouldInclude) {
      const highlight = experience.experience_id === highlightId;
      validExp.push(
        <ExperienceItem
          key={experience.experience_id}
          experience={experience}
          highlight={highlight}
          onClick={
            onSelect ? () => onSelect(experience.experience_id) : undefined
          }
        />
      );
    }
  }
  return <BulletedList>{validExp}</BulletedList>;
};
export default ExperienceList;
