import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Competition } from '../../../competition';
import {
  Experience,
  ExperienceGrade,
  ExperienceType
} from '../../../experience';
import { IP_ADDRESS } from '../../../Global';
import { Program } from '../../../program';
import CompetitionOverview from '../CompetitionOverview/CompetitionOverview';
import ExperienceOverview from '../ExperienceOverview/ExperienceOverview';
import ProgramOverview from '../ProgramOverview/ProgramOverview';

const OverviewWrapper = () => {
  const params = useParams();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<
    (Experience & Competition) | (Experience & Program)
  >();

  const experienceId = Number(params['experienceId']);
  const downloadData = useCallback(async () => {
    if (!experienceId || loaded) {
      return;
    }

    await fetch(`${IP_ADDRESS}/experiences`)
      .then((res) => res.json())
      .then((res) => {
        for (const experience of res) {
          if (Number(experience.experience_id) !== experienceId) {
            continue;
          }
          experience.type =
            ExperienceType[experience.type as keyof typeof ExperienceType];
          const newGrades: ExperienceGrade[] = [];
          for (const grade of experience.grades) {
            newGrades.push({ grade: grade });
          }
          experience.origin_year = new Date(experience.origin_year);
          experience.start_date = new Date(experience.start_date);
          experience.end_date = new Date(experience.end_date);
          const newDates = [];
          for (const importantDate of experience.important_dates) {
            importantDate.date = new Date(importantDate.date);
            newDates.push(importantDate);
          }
          experience.important_dates = newDates;
          if (experience.type === ExperienceType.PROGRAM) {
            experience.application_due_date = new Date(
              experience.application_due_date
            );
          }

          setData(experience);
        }
      })
      .catch((err) => {
        alert('No Data Access');
        console.error(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [experienceId, loaded]);

  useEffect(() => {
    downloadData();
  }, [downloadData]);

  if (!experienceId) {
    return <>You must specify a valid experience id.</>;
  }

  if (!loaded) {
    return <>Loading...</>;
  }

  if (!data) {
    return <>Failed to load data.</>;
  }

  let extra: ReactNode;
  const type = data.type;
  switch (type) {
    case ExperienceType.COMPETITION: {
      extra = <CompetitionOverview competition={data as Competition} />;
      break;
    }
    case ExperienceType.PROGRAM: {
      extra = <ProgramOverview program={data as Program} />;
      break;
    }
  }

  return <ExperienceOverview experience={data}>{extra}</ExperienceOverview>;
};

export default OverviewWrapper;
