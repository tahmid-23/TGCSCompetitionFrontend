import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  Category,
  Experience,
  ExperienceType,
  Grade
} from '../../api/model/experience';
import ExperienceList, { Filter } from '../ExperienceList/ExperienceList';
import Dropdown from '../InputComponents/Dropdown/Dropdown';
import AwardSelection from '../Search/AwardSelection';
import GradeSelection from '../Search/GradeSelection';
import ProgramSelection from '../Search/ProgramSelection';
import TopicSelection from '../Search/TopicSelection';
import { useNavigate } from 'react-router-dom';
import { checkLogin, getExperiences, remove } from '../../api/api';
import { Program, ProgramType } from '../../api/model/program';
import {
  selectLogin,
  setHasAccess,
  setNotAdmin,
  setNotHasAccess
} from '../../features/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setAdmin } from '../../features/login';
import { AwardType, Competition } from '../../api/model/competition';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import styles from './Home.module.css';
import { Search } from '@mui/icons-material';

function createTopicFilter(topics: Category[]): Filter {
  return (experience: Experience) => {
    for (const categoryObject of experience.categories) {
      if (topics.includes(categoryObject.category)) {
        return true;
      }
    }

    return false;
  };
}

function createGradeFilter(grades: Grade[]): Filter {
  return (experience: Experience) => {
    for (const gradeObject of experience.grades) {
      if (grades.some((grade) => gradeObject.grade === grade)) {
        return true;
      }
    }

    return false;
  };
}

function createSearchFilter(keyword: string) {
  return (experience: Experience) => {
    return experience.name.toLowerCase().includes(keyword.toLowerCase());
  };
}

function createProgramFilter(programTypes: ProgramType[]) {
  return (experience: Experience) => {
    if (experience.type !== ExperienceType.PROGRAM) {
      return false;
    }
    return programTypes.some(
      (type) => type === (experience as unknown as Program).program_type
    );
  };
}

function createAwardFilter(awardTypes: AwardType[]) {
  return (experience: Experience) => {
    if (experience.type !== ExperienceType.COMPETITION) {
      return false;
    }

    for (const awardObject of (experience as unknown as Competition).awards) {
      if (awardTypes.some((awardType) => awardType === awardObject.type)) {
        return true;
      }
    }

    return false;
  };
}

const Home = () => {
  const [filter, setFilter] = useState<Filter>();
  const [filterType, setFilterType] = useState<string>('name');
  const [highlightId, setHighlightId] = useState<number>();
  const navigate = useNavigate();
  const loginState = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  let inputComponent: ReactElement;

  const [experiences, setExperienceData] = useState<Experience[]>();

  const onDelete = useCallback(
    (deleteId: number) => {
      if (window.confirm('Are you sure you want to delete this competition?')) {
        remove('experience', 'experience_id', deleteId, () => {
          navigate('/login');
        }).finally(() => {
          if (highlightId === deleteId) {
            setHighlightId(undefined);
          }
        });
      }
    },
    [navigate, highlightId]
  );

  const downloadData = useCallback(async () => {
    await getExperiences(() => navigate('/login'))
      .then(setExperienceData)
      .catch((err) => {
        alert('Something went wrong!');
        console.error(err);
      });
  }, [navigate]);

  const updateAdminState = useCallback(async () => {
    await checkLogin().then((login) => {
      if (login.admin) {
        dispatch(setAdmin());
      } else {
        dispatch(setNotAdmin());
      }

      if (login.hasAccess) {
        dispatch(setHasAccess());
      } else {
        dispatch(setNotHasAccess());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    downloadData();
    updateAdminState();
  }, [downloadData, updateAdminState]);

  if (filterType === 'Grade') {
    inputComponent = (
      <GradeSelection
        onGradeChange={(grades) => {
          setFilter(() => createGradeFilter(grades));
        }}
      />
    );
  } else if (filterType === 'Topic') {
    inputComponent = (
      <TopicSelection
        onTopicChange={(topics) => {
          setFilter(() => createTopicFilter(topics));
        }}
      />
    );
  } else if (filterType === 'Award') {
    inputComponent = (
      <AwardSelection
        onAwardChange={(awards) => {
          setFilter(() => createAwardFilter(awards));
        }}
      />
    );
  } else if (filterType === 'Program') {
    inputComponent = (
      <ProgramSelection
        onProgramTypeChange={(focuses) => {
          setFilter(() => createProgramFilter(focuses));
        }}
      />
    );
  } else {
    inputComponent = (
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
        onChange={(e) => {
          setFilter(() => createSearchFilter(e.target.value));
        }}
      />
    );
  }

  if (loginState.hasAccess === undefined) {
    return <></>;
  } else if (!loginState.hasAccess) {
    navigate('/login');
  }

  return (
    <div className={styles.wrapper}>
      <FormControl sx={{ width: '100%' }}>
        <div style={{ display: 'flex', marginBottom: '1vh' }}>
          <Dropdown
            id="filter-by"
            style={{ alignSelf: 'center' }}
            label="Filter by"
            items={['Name', 'Grade', 'Topic', 'Award', 'Program']}
            defaultChoice="Name"
            onChange={(e) => {
              setFilterType(e.target.value);
              switch (e.target.value) {
                case 'Name':
                  setFilter(() => createSearchFilter(''));
                  break;
                case 'Grade':
                  setFilter(() => createGradeFilter([]));
                  break;
                case 'Topic':
                  setFilter(() => createTopicFilter([]));
                  break;
                case 'Award':
                  setFilter(() => createAwardFilter([]));
                  break;
                case 'Program':
                  setFilter(() => createProgramFilter([]));
                  break;
              }
            }}
          />
          &nbsp;
          {inputComponent}
        </div>
        <ExperienceList
          experiences={experiences || []}
          filter={filter}
          highlightId={highlightId}
          onSelect={setHighlightId}
          onDelete={onDelete}
        />
      </FormControl>
    </div>
  );
};

export default Home;
