import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { Experience, ExperienceType } from '../../../experience';
import QuickNavigation from '../../QuickNavigation/QuickNavigation';
import styles from '../Overview.module.css';

interface ExperienceOverviewProps {
  experience: Experience;
}

const ExperienceOverview = ({
  experience,
  children
}: PropsWithChildren<ExperienceOverviewProps>) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.infoEntry}>
        <h1 className={styles.title}>{experience.name}</h1>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>Type: {ExperienceType[experience.type]}</p>
      </div>
      {experience.website_url && (
        <div className={styles.infoEntry}>
          <span className={styles.info}>Website URL:</span>
          &nbsp;
          <a className={styles.info} href={experience.website_url}>
            {experience.website_url}
          </a>
        </div>
      )}
      <div className={styles.infoEntry}>
        <p className={styles.info}>Entry Fee: ${experience.entry_fee}</p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>
          Grades: {experience.grades.map((grade) => grade.grade).join(', ')}
        </p>
      </div>
      <div className={styles.infoEntry}>
        <p className={styles.info}>
          Categories:{' '}
          {experience.categories
            .map((category) => category.category)
            .join(', ')}
        </p>
      </div>
      {experience.participant_count && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>
            Participant count: {experience.participant_count}
          </p>
        </div>
      )}
      {experience.origin_year && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>
            Origin Year: {experience.origin_year}
          </p>
        </div>
      )}
      {experience.purpose && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Purpose: {experience.purpose}</p>
        </div>
      )}
      <div className={styles.infoEntry}>
        <p className={styles.info}>Description: {experience.description}</p>
      </div>
      {experience.required_items && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>
            Required Items: {experience.required_items}
          </p>
        </div>
      )}
      {experience.advice && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Advice: {experience.advice}</p>
        </div>
      )}
      {(experience.virtual !== undefined) && (
        <div className={styles.infoEntry}>
          <p className={styles.info}>Virtual: {(experience.virtual) ? 'True' : 'False'}</p>
        </div>
      )}
      {experience.entry_description && (
        <div className={styles.infoEntry}>
        <p className={styles.info}>Entry Description: {experience.entry_description}</p>
      </div>
      )}
      {children}
      <div>
        <QuickNavigation />
        &nbsp;
        <button
          type="button"
          onClick={() =>
            navigate(`/feedback?experienceId=${experience.experience_id}`)
          }
        >
          Submit Feedback
        </button>
      </div>
    </>
  );
};

export default ExperienceOverview;
