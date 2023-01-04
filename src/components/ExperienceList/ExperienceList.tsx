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

const Experience = (
  {
    name,
    category,
    highlight,
    onClick
  }: ExperienceProps
) => {
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

const ExperienceList = (
  {
    expData,
    filter,
    highlightId,
    onSelect
  }: ExpListProps
) => {
  const validExp: ReactElement[] = [];
  for (let i = 0; i < expData.length; ++i) {
    const exp = expData[i];
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
          key={i}
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
