import { MouseEventHandler, ReactElement } from 'react';
import BulletedList from '../BulletedList/BulletedList';
import styles from './ExperienceList.module.css';

interface ExperienceProps {
  id: number;
  url?: string;
  fee: number;
  participantCount?: number;
  name: string;
  originYear?: Date;
  purpose?: string;
  description?: string;
  requiredItems?: string;
  advice?: string;
  category: string;
  highlight: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const Experience: React.FC<ExperienceProps> = ({
  name,
  category,
  highlight,
  onClick
}) => {
  const className = highlight ? styles.highlight : undefined;
  return (
    <div className={className} onClick={onClick}>
      {name} <i>({category})</i>
    </div>
  );
};

export type Filter = (arg0: Record<string, any>) => boolean;

interface ExpListProps {
  expData: Record<string, any>[];
  filter?: Filter;
  highlightId?: number;
  onSelect?: (arg0: number) => void;
}

const ExperienceList: React.FC<ExpListProps> = ({
  expData,
  filter,
  highlightId,
  onSelect
}) => {
  const validExp: ReactElement[] = [];
  for (const exp of expData) {
    if (!filter || filter(exp)) {
      let categories = '';
      for (const category of exp.categories) {
        categories += String(category.category) + ', ';
      }
      categories = categories.substring(0, categories.length - 2);

      const highlight = exp.experience_id === highlightId;
      validExp.push(
        <Experience
          id={Number(exp.experience_id)}
          fee={Number(exp.fee)}
          name={String(exp.name)}
          category={categories}
          highlight={highlight}
          onClick={onSelect ? () => onSelect(exp.experience_id) : undefined}
        />
      );
    }
  }
  return <BulletedList>{validExp}</BulletedList>;
};
export default ExperienceList;
