import { ReactElement, useEffect, useState } from 'react';
import { IP_ADDRESS } from '../../Global';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import ExperienceList from '../ExperienceList/ExperienceList';
import AwardFilter from '../Search/AwardFilter';
import GradeFilter from '../Search/GradeFilter';
import ProgramFilter from '../Search/ProgramFilter';
import SearchBox from '../Search/SearchBox';
import TopicFilter from '../Search/TopicFilter';

const Home = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('name');
  const [highlightId, setHighlightId] = useState<number>();
  let inputComponent: ReactElement;

  const [experienceData, setExperienceData] =
    useState<Record<string, object>[]>();

  async function downloadData() {
    const experienceJson = await fetch(`${IP_ADDRESS}/experiences`)
      .then((res) => res.json())
      .catch((err) => {
        alert('No Data Access');
        console.error(err);
      });
    setExperienceData(experienceJson);
  }

  useEffect(() => {
    downloadData();
  }, []);

  if (searchFilter === 'grade') {
    inputComponent = <GradeFilter></GradeFilter>;
  } else if (searchFilter === 'topic') {
    inputComponent = <TopicFilter></TopicFilter>;
  } else if (searchFilter === 'award') {
    inputComponent = <AwardFilter></AwardFilter>;
  } else if (searchFilter === 'program') {
    inputComponent = <ProgramFilter></ProgramFilter>;
  } else {
    inputComponent = (
      <SearchBox name="test" id="test" output={setSearchString}></SearchBox>
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
        filterData={searchString}
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
          setSearchFilter(e.target.value);
        }}
      />
      {inputComponent}
      <hr />
      <h1>Search Results: {searchString}</h1>
    </>
  );
};

export default Home;
