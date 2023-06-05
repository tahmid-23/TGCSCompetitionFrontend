import { Typography } from '@mui/material';
import {
  Competition,
  getAwardTypeDisplay
} from '../../../api/model/competition';
import styles from './CompetitionOverview.module.css';

interface CompetitionOverviewProps {
  competition?: Competition;
}

const CompetitionOverview = ({ competition }: CompetitionOverviewProps) => {
  return (
    <>
      {competition?.judges_description && (
        <div>
          <Typography>
            Judge Description: {competition.judges_description}
          </Typography>
        </div>
      )}
      {competition?.judging_criteria && (
        <div>
          <Typography>
            Judging Criteria: {competition.judging_criteria}
          </Typography>
        </div>
      )}
      {competition?.awards && competition.awards.length !== 0 && (
        <>
          <div>
            <Typography>Awards: </Typography>
          </div>
          <ul className={styles.awardList}>
            {competition.awards.map((award) => {
              return (
                <li key={award.award_id}>
                  <Typography>
                    {getAwardTypeDisplay(award.type)}: {award.description}
                  </Typography>
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
