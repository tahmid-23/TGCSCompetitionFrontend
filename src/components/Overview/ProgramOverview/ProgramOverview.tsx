import styles from '../Overview.module.css';

interface ProgramOverviewProps {
  type: string;
  monthly_fee: number;
  time_commitment: number;
}

const ProgramOverview: React.FC<ProgramOverviewProps> = ({
  type,
  monthly_fee,
  time_commitment
}) => {
  return (
    <>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Type: {type}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Monthly Fee: {monthly_fee}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Time commitment: {time_commitment}</p>
      </div>
    </>
  );
};

export default ProgramOverview;
