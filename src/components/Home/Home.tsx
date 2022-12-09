import { ReactElement, useEffect, useState } from 'react';
import { IP_ADDRESS } from '../../global';
import Button from '../Button/Button';
import Dropdown from '../InputComponents/Dropdown';
import ExperienceList, { Filter } from '../ExperienceList/ExperienceList';
import AwardFilter from '../Search/AwardFilter';
import GradeFilter from '../Search/GradeFilter';
import ProgramFilter from '../Search/ProgramFilter';
import SearchBox from '../Search/SearchBox';
import TopicFilter from '../Search/TopicFilter';

async function downloadData(): Promise<any> {
  return await fetch(`${IP_ADDRESS}/experiences`)
    .then((res) => res.json())
    .catch((err) => {
      alert('No Data Access');
      console.error(err);
    });
}

const Home = () => {
  const [filter, setFilter] = useState<Filter>();
  const [filterType, setFilterType] = useState<string>('name');
  const [highlightId, setHighlightId] = useState<number>();
  let inputComponent: ReactElement;

  const [experienceData, setExperienceData] =
    useState<Record<string, object>[]>();

  useEffect(() => {
    downloadData().then(setExperienceData);
  }, []);

  if (filterType === 'grade') {
    inputComponent = <GradeFilter></GradeFilter>;
  } else if (filterType === 'topic') {
    inputComponent = (
      <TopicFilter
        onTopicChange={(topics) => {
          setFilter(() => (experience: Record<string, any>) => {
            for (const categoryObject of experience.categories) {
              if (topics.includes(categoryObject.category)) {
                return true;
              }
            }

            return false;
          });
        }}
      ></TopicFilter>
    );
  } else if (filterType === 'award') {
    inputComponent = <AwardFilter></AwardFilter>;
  } else if (filterType === 'program') {
    inputComponent = <ProgramFilter></ProgramFilter>;
  } else {
    inputComponent = (
      <SearchBox
        name="test"
        id="test"
        onChange={(e) =>
          setFilter(() => (experience: Record<string, any>) => {
            return String(experience.name).includes(e.target.value);
          })
        }
      ></SearchBox>
    );
  }

  const onDelete = () => {
    if (!highlightId) {
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableName: 'experience', rowId: highlightId })
    };
    fetch(`${IP_ADDRESS}/remove`, requestOptions)
      .then(() => {
        setExperienceData(
          experienceData?.filter(
            (experience) => Number(experience.experience_id) !== highlightId
          )
        );
      })
      .finally(() => {
        setHighlightId(undefined);
      });
  };

  return (
    <>
      <ExperienceList
        expData={experienceData || []}
        filter={filter}
        highlightId={highlightId}
        onSelect={(id) => {
          setHighlightId(id);
        }}
      />
      <Button text="Add" to="/add" />
      <Button text="Edit" disabled={!highlightId} to="/update" />
      <Button text="Delete" disabled={!highlightId} onClick={onDelete} />
      <Dropdown
        name="test"
        id="test"
        items={['name', 'grade', 'topic', 'award', 'program']}
        onChange={(e) => {
          setFilterType(e.target.value);
        }}
      />
      {inputComponent}
      <hr />
    </>
  );
};

export default Home;
