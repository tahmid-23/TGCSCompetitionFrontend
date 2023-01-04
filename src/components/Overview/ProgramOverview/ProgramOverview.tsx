import { Program } from '../../../program';
import styles from '../Overview.module.css';

export interface ProgramOverviewProps {
  program: Program;
}

const ProgramOverview = ({ program }: ProgramOverviewProps) => {
  return (
    <>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Program Type: {program.program_type}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Monthly Fee: ${program.monthly_fee}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>
          Focuses:{' '}
          {program.program_focuses.map((focus) => focus.focus).join(', ')}
        </p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>
          Time commitment: {program.time_commitment}
        </p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>
          Application Due Date:{' '}
          {program.application_due_date.toLocaleDateString()}
        </p>
      </div>
    </>
  );
};

export default ProgramOverview;
