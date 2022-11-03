export enum ExperienceCategory {
  MATH,
  CS
}

interface ExperienceProps {
  name: string;
  category: ExperienceCategory;
}

const Experience: React.FC<ExperienceProps> = ({ name, category }) => {
  return (
    <>
      {name} <i>({ExperienceCategory[category]})</i>
    </>
  );
};

export default Experience;
