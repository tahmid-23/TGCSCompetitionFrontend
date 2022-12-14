import React from 'react';
import competitionStyles from './CompetitionOverview.module.css';
import styles from '../Overview.module.css';

export interface Award {
  type: string;
  description?: string;
}

interface CompetitionOverviewProps {
  judgesDescription?: string;
  judgingCriteria: string;
  awards: Award[];
}

const CompetitionOverview: React.FC<CompetitionOverviewProps> = ({
  judgesDescription,
  judgingCriteria,
  awards
}) => {
  return (
    <>
      {judgesDescription && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Judge Description: {judgesDescription}</p>
        </div>
      )}
      <div className={styles.infoEntry}>
        <p className={styles.info}>Judging Criteria: {judgingCriteria}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Awards: </p>
      </div>
      <ul className={competitionStyles.awardList}>
        {awards.map((award, index) => {
          return (
            <li key={index} className={styles.infoEntry}>
              <p className={styles.info}>
                {award.type}: {award.description}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CompetitionOverview;
