import { ReactFragment, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IP_ADDRESS } from '../../../Global';
import CompetitionOverview, {
  Award
} from '../CompetitionOverview/CompetitionOverview';
import ExperienceOverview from '../ExperienceOverview/ExperienceOverview';

const OverviewWrapper = () => {
  const params = useParams();
  const experienceId = Number(params['experienceId']);
  const [loaded, setLoaded] = useState<boolean>();
  const [data, setData] = useState<any>();

  const downloadData = async () => {
    if (!experienceId) {
      return;
    }

    await fetch(`${IP_ADDRESS}/experiences`)
      .then((res) => res.json())
      .then((res) => {
        for (const experience of res) {
          if (Number(experience.experience_id) !== experienceId) {
            continue;
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
  };

  useEffect(() => {
    downloadData();
  });

  if (!experienceId) {
    return <>You must specify a valid experience id.</>;
  }

  if (!loaded) {
    return <>Loading...</>;
  }

  if (!data) {
    return <>Failed to load data.</>;
  }

  const type = data['type'];
  let extra: ReactNode;
  switch (type) {
    case 'COMPETITION': {
      const awards: Award[] = [];
      for (const award of data['awards']) {
        awards.push(award);
      }
      const competitionProps = {
        judges_description: data['judges_description'],
        judgingCriteria: data['judging_criteria'],
        awards: awards
      };
      extra = <CompetitionOverview {...competitionProps} />;
      break;
    }
    case 'PROGRAM': {
      extra = '';
      break;
    }
  }
  const grades = [];
  for (const grade of data['grades']) {
    grades.push(grade.grade);
  }
  const categories = [];
  for (const category of data['categories']) {
    categories.push(category.category);
  }
  const experienceProps = {
    experienceId: Number(experienceId),
    competitionName: data['name'],
    category: type,
    url: data['website_url'],
    fee: data['entry_fee'],
    grades: grades,
    categories: categories,
    participantCount: data['participant_count'],
    originYear: new Date(data['origin_year']),
    purpose: data['purpose'],
    description: data['description'],
    requiredItems: data['required_items'],
    advice: data['advice'],
    children: extra
  };
  return <ExperienceOverview {...experienceProps} />;
};

export default OverviewWrapper;
