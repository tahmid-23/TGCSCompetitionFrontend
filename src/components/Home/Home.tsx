import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  Category,
  Experience,
  ExperienceType,
  Grade
} from '../../api/model/experience';
import Button from '../Button/Button';
import ExperienceList, { Filter } from '../ExperienceList/ExperienceList';
import Dropdown from '../InputComponents/Dropdown';
import AwardSelection from '../Search/AwardSelection';
import GradeSelection from '../Search/GradeSelection';
import ProgramSelection from '../Search/ProgramSelection';
import SearchBox from '../Search/SearchBox';
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
  const adminState = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  let inputComponent: ReactElement;

  const [experiences, setExperienceData] = useState<Experience[]>();

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

  if (filterType === 'grade') {
    inputComponent = (
      <GradeSelection
        onGradeChange={(grades) => {
          setFilter(() => createGradeFilter(grades));
        }}
      />
    );
  } else if (filterType === 'topic') {
    inputComponent = (
      <TopicSelection
        onTopicChange={(topics) => {
          setFilter(() => createTopicFilter(topics));
        }}
      />
    );
  } else if (filterType === 'award') {
    inputComponent = (
      <AwardSelection
        onAwardChange={(awards) => {
          setFilter(() => createAwardFilter(awards));
        }}
      />
    );
  } else if (filterType === 'program') {
    inputComponent = (
      <ProgramSelection
        onProgramTypeChange={(focuses) => {
          setFilter(() => createProgramFilter(focuses));
        }}
      />
    );
  } else {
    inputComponent = (
      <SearchBox
        onChange={(e) => {
          const keyword = e.currentTarget.value;
          setFilter(() => createSearchFilter(keyword));
        }}
      />
    );
  }

  const onDelete = useCallback(() => {
    if (!highlightId) {
      return;
    }

    remove('experience', 'experience_id', highlightId, () => {
      navigate('/login');
    }).finally(() => {
      setHighlightId(undefined);
    });
  }, [navigate, highlightId]);

  if (adminState.hasAccess === undefined) {
    return <></>;
  } else if (!adminState.hasAccess) {
    navigate('/login');
  }

  return (
    <>
      <div>
        {adminState.admin && (
          <>
            <Button text="Add" to="/add" />
            <Button
              text="Edit"
              disabled={!highlightId}
              to={highlightId ? `/edit/${highlightId}` : undefined}
            />
            <Button text="Delete" disabled={!highlightId} onClick={onDelete} />
          </>
        )}
        <Button
          text="View"
          disabled={!highlightId}
          to={highlightId ? `/view/${highlightId}` : undefined}
        />
      </div>
      <Dropdown
        name="filter-by"
        id="filter-by"
        label="Filter by"
        items={['name', 'grade', 'topic', 'award', 'program']}
        onChange={(e) => {
          setFilterType(e.currentTarget.value);
          switch (e.currentTarget.value) {
            case 'name':
              setFilter(() => createSearchFilter(''));
              break;
            case 'grade':
              setFilter(() => createGradeFilter([]));
              break;
            case 'topic':
              setFilter(() => createTopicFilter([]));
              break;
            case 'program':
              setFilter(() => createProgramFilter([]));
              break;
            case 'award':
              setFilter(() => createAwardFilter([]));
              break;
          }
        }}
      />
      {inputComponent}
      <ExperienceList
        experiences={experiences || []}
        filter={filter}
        highlightId={highlightId}
        onSelect={setHighlightId}
      />
      <Button text="Add" to="/add" />
      <Button text="Edit" disabled={!highlightId} to={`/edit/${highlightId}`} />
      <Button text="Delete" disabled={!highlightId} onClick={onDelete} />
      <Button text="View" disabled={!highlightId} to={`/view/${highlightId}`} />
    </>
  );
};

export default Home;
