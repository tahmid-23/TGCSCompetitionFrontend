import { ReactElement } from 'react';
import BulletedList from '../BulletedList/BulletedList';

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
}

const Experience: React.FC<ExperienceProps> = ({ name, category }) => {
  return (
    <>
      {name} <i>({category})</i>
    </>
  );
};

interface ExpListProps {
  expData: Record<string, any>[];
  filterData: string;
}
const ExperienceList: React.FC<ExpListProps> = ({ expData, filterData }) => {
  const validExp: ReactElement[] = [];
  for (const exp of expData) {
    if (filterData === '' || String(exp.name).includes(filterData)) {
      let categories = '';
      for (const category of exp.categories) {
        categories += String(category.category) + ', ';
      }
      categories = categories.substring(0, categories.length - 2);
      validExp.push(
        <Experience
          id={Number(exp.id)}
          fee={Number(exp.fee)}
          name={String(exp.name)}
          category={categories}
        />
      );
    }
  }
  return (
    <>
      <BulletedList>
        {validExp.map((exp) => {
          return exp;
        })}
      </BulletedList>
    </>
  );
};
export default ExperienceList;
