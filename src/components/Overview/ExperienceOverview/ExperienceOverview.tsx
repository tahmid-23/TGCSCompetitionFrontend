import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import QuickNavigation from '../../QuickNavigation/QuickNavigation';
import styles from '../Overview.module.css';

interface ExperienceOverviewProps {
  experienceId: number;
  competitionName: string;
  category: string;
  url?: string;
  fee: number;
  grades: string[];
  categories: string[];
  participantCount?: string;
  originYear?: Date;
  purpose?: string;
  description: string;
  requiredItems?: string;
  advice?: string;
}

const ExperienceOverview: React.FC<
  PropsWithChildren<ExperienceOverviewProps>
> = ({
  experienceId,
  competitionName,
  children,
  url,
  fee,
  grades,
  categories,
  participantCount,
  originYear,
  purpose,
  description,
  requiredItems,
  advice,
  category
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.infoEntry}>
        <h1 className={styles.title}>{competitionName}</h1>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Category: {category}</p>
      </div>
      {url && (
        <div className={styles.infoEntry}>
          <span className={styles.info}>Website URL:</span>
          &nbsp;
          <a className={styles.info} href={url}>
            {url}
          </a>
        </div>
      )}
      <div className={styles.infoEntry}>
        <p className={styles.info}>Entry Fee: ${fee}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Grades: {grades.join(', ')}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Categories: {categories.join(', ')}</p>
      </div>
      {participantCount && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Participant count: {participantCount}</p>
        </div>
      )}
      {originYear && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Origin Year: {originYear.getFullYear()}</p>
        </div>
      )}
      {purpose && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Purpose: {purpose}</p>
        </div>
      )}
      <div className={styles.infoEntry}>
        <p className={styles.info}>Description: {description}</p>
      </div>
      {requiredItems && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Required Items: {requiredItems}</p>
        </div>
      )}
      {advice && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Advice: {advice}</p>
        </div>
      )}
      {children}
      <div>
        <QuickNavigation />
        &nbsp;
        <button
          type="button"
          onClick={() => navigate(`/feedback?experienceId=${experienceId}`)}
        >
          Submit Feedback
        </button>
      </div>
    </>
  );
};

export default ExperienceOverview;
