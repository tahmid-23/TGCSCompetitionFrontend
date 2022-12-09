import { ExperienceData } from '../../experience-data';
import styles from './ExperienceOverview.module.css';

interface ExperienceOverviewProps {
  data: ExperienceData;
}

const ExperienceOverview: React.FC<ExperienceOverviewProps> = ({ data }) => {
  return (
    <>
      <h1 className={styles.title}>{data.name}</h1>
      <p className={styles.info}>Cost: {data.fee}</p>
    </>
  );
};

export default ExperienceOverview;
