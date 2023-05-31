import {
  Competition,
  getAwardTypeDisplay
} from '../../../api/model/competition';
import styles from '../Overview.module.css';
import competitionStyles from './CompetitionOverview.module.css';

interface CompetitionOverviewProps {
  competition: Competition;
}

const CompetitionOverview = ({ competition }: CompetitionOverviewProps) => {
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
      {competition.awards && competition.awards.length !== 0 && (
        <>
          <div className={styles.infoEntry}>
            <p className={styles.info}>Awards: </p>
          </div>
          <ul className={competitionStyles.awardList}>
            {competition.awards.map((award) => {
              return (
                <li key={award.award_id} className={styles.infoEntry}>
                  <p className={styles.info}>
                    {getAwardTypeDisplay(award.type)}: {award.description}
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
