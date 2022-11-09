import { ReactElement, useState } from 'react';
import BulletedList from '../BulletedList/BulletedList';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Experience, { ExperienceCategory } from '../Experience/Experience';
import AwardFilter from '../Search/AwardFilter';
import GradeFilter from '../Search/GradeFilter';
import ProgramFilter from '../Search/ProgramFilter';
import SearchBox from '../Search/SearchBox';
import TopicFilter from '../Search/TopicFilter';

const App = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('name');
  let inputComponent: ReactElement;

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

  return (
    <>
      <>
        <BulletedList>
          <Experience name="AMC" category={ExperienceCategory.MATH} />
          <Experience name="USACO" category={ExperienceCategory.CS} />
        </BulletedList>
        <Button
          text="Add"
          onclick={() => {
            alert('Add');
          }}
        ></Button>
        <Button
          text="Edit"
          onclick={() => {
            alert('Edit');
          }}
        ></Button>
        <Button
          text="Delete"
          onclick={() => {
            alert('Delete');
          }}
        ></Button>
        <Dropdown
          name="test"
          id="test"
          items={['name', 'grade', 'topic', 'award', 'program']}
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
        ></Dropdown>
        {inputComponent}
      </>
      <hr></hr>
      <>
        <h1>Search Results: {searchString}</h1>
      </>
    </>
  );
};

export default App;
