import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Experience, ExperienceType } from '../../../api/model/experience';
import { Program } from '../../../api/model/program';
import CompetitionOverview from '../CompetitionOverview/CompetitionOverview';
import ExperienceOverview from '../ExperienceOverview/ExperienceOverview';
import ProgramOverview from '../ProgramOverview/ProgramOverview';
import { useNavigate } from 'react-router-dom';
import { Competition } from '../../../api/model/competition';
import { getExperience } from '../../../api/api';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { selectLogin } from '../../../features/login';
import { Typography, useTheme } from '@mui/material';

const OverviewWrapper = () => {
  const loginState = useAppSelector(selectLogin);
  const params = useParams();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<
    (Experience & Competition) | (Experience & Program)
  >();
  const theme = useTheme();
  const navigate = useNavigate();

  const experienceId = Number(params['experienceId']);
  const downloadData = useCallback(async () => {
    if (!experienceId || loaded) {
      return;
    }

    await getExperience(experienceId, () => {
      navigate('/login');
    })
      .then((experience) =>
        setData(
          experience as (Experience & Competition) | (Experience & Program)
        )
      )
      .catch((err) => {
        alert('Something went wrong!');
        console.error(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [experienceId, loaded, navigate]);

  useEffect(() => {
    if (!loginState.hasAccess) {
      navigate('/');
      return;
    }
    downloadData();
  }, [downloadData, loginState, loginState.hasAccess, navigate]);

  if (!experienceId) {
    return (
      <Typography color={theme.palette.error.main}>
        You must specify a valid experience id.
      </Typography>
    );
  }

  if (!loaded) {
    return <Typography>Loading...</Typography>;
  }

  if (!data) {
    return (
      <Typography color={theme.palette.error.main}>
        Failed to load data.
      </Typography>
    );
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
