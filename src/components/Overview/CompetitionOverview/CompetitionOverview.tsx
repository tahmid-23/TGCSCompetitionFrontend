import React from 'react';
import { Competition } from '../../../competition';
import styles from '../Overview.module.css';
import competitionStyles from './CompetitionOverview.module.css';

interface CompetitionOverviewProps {
  competition: Competition;
}

const CompetitionOverview: React.FC<CompetitionOverviewProps> = ({
  competition
}) => {
  return (
    <>
      {competition.judges_description && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>
            Judge Description: {competition.judges_description}
          </p>
        </div>
      )}
      <div className={styles.infoEntry}>
        <p className={styles.info}>
          Judging Criteria: {competition.judging_criteria}
        </p>
      </div>
      {competition.awards.length !== 0 && (
        <>
          <div className={styles.infoEntry}>
            <p className={styles.info}>Awards: </p>
          </div>
          <ul className={competitionStyles.awardList}>
            {competition.awards.map((award, index) => {
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
      )}
    </>
  );
};

export default CompetitionOverview;
