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
import { getExperiences, remove } from '../../api/api';
import { Focus, Program, ProgramType } from '../../api/model/program';

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
    return programTypes.some((type) => {
      return type === (experience as unknown as Program).program_type;
    });
  };
}

function createFocusFilter(programFocuses: Focus[]) {
  return (experience: Experience) => {
    if (experience.type !== ExperienceType.PROGRAM) {
      return false;
    }
    for (const focusObject of (experience as unknown as Program)
      .program_focuses) {
      if (
        programFocuses.some((focus) => {
          return focus === focusObject.focus;
        })
      ) {
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

  useEffect(() => {
    downloadData();
  }, [downloadData]);

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
    inputComponent = <AwardSelection />;
  } else if (filterType === 'program') {
    inputComponent = (
      <ProgramSelection
        onFocusChange={(focuses) => {
          setFilter(() => createFocusFilter(focuses));
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

  return (
    <>
      <div>
        <Button text="Add" to="/add" />
        <Button
          text="Edit"
          disabled={!highlightId}
          to={`/edit/${highlightId}`}
        />
        <Button text="Delete" disabled={!highlightId} onClick={onDelete} />
        <Button
          text="View"
          disabled={!highlightId}
          to={`/view/${highlightId}`}
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
