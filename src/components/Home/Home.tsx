import { useCallback, useEffect, useState } from 'react';
import { Experience } from '../../api/model/experience';
import ExperienceList, { Filter } from '../ExperienceList/ExperienceList';
import { useNavigate } from 'react-router-dom';
import { getExperiences, remove } from '../../api/api';
import { selectLogin } from '../../features/login';
import { useAppSelector } from '../../hooks/redux-hooks';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Unstable_Grid2 as Grid } from '@mui/material';
import styles from './Home.module.css';
import { Search } from '@mui/icons-material';
import FilterMenu from '../FilterMenu/FilterMenu';

const Home = () => {
  const [filter, setFilter] = useState<Filter>();
  const [highlightId, setHighlightId] = useState<number>();
  const [keyword, setKeyword] = useState('');
  const [recommendations, setRecommendations] =
    useState<Record<number, number>>();
  const navigate = useNavigate();
  const loginState = useAppSelector(selectLogin);

  const [experiences, setExperiences] = useState<Experience[]>();

  const onDelete = useCallback(
    (deleteId: number) => {
      if (window.confirm('Are you sure you want to delete this competition?')) {
        remove('experience', 'experience_id', deleteId, () => {
          navigate('/login');
        })
          .then(() => {
            if (highlightId === deleteId) {
              setHighlightId(undefined);
            }

            setExperiences(
              experiences?.filter(
                (experience) => experience.experience_id !== deleteId
              )
            );
          })
          .catch((err) => {
            console.error(err);
            alert('An error occurred!');
          });
      }
    },
    [navigate, highlightId, experiences]
  );

  const downloadData = useCallback(async () => {
    await getExperiences(() => navigate('/login'))
      .then(setExperiences)
      .catch((err) => {
        alert('Something went wrong!');
        console.error(err);
      });
  }, [navigate]);

  useEffect(() => {
    if (loginState.hasAccess) {
      downloadData();
    } else {
      navigate('/login');
    }
  }, [downloadData, loginState.hasAccess, navigate]);

  if (!loginState.hasAccess) {
    return <></>;
  }

  return (
    <Grid className={styles.wrapper} container rowSpacing={1} columnSpacing={4}>
      <Grid xs={4}>
        <FilterMenu
          onChangeFilter={(newFilter) => setFilter(() => newFilter)}
        />
      </Grid>
      <Grid xs={8}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
              sx={{ alignSelf: 'center' }}
              onChange={(e) => setKeyword(e.currentTarget.value)}
              placeholder="Search..."
            />
            {loginState.admin && (
              <Button variant="contained" onClick={() => navigate('/add')}>
                Add Experience
              </Button>
            )}
            <Button variant="contained">Refresh recommendations</Button>
          </Stack>
          <ExperienceList
            experiences={experiences || []}
            recommendations={recommendations}
            filter={filter}
            keyword={keyword}
            highlightId={highlightId}
            onSelect={setHighlightId}
            onDelete={onDelete}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;
