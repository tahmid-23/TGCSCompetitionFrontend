import BulletedList from '../BulletedList/BulletedList';
import Experience, { ExperienceCategory } from '../Experience/Experience';

const App = () => {
  return (
    <BulletedList>
      <Experience name="AMC" category={ExperienceCategory.MATH} />
      <Experience name="USACO" category={ExperienceCategory.CS} />
    </BulletedList>
  );
};

export default App;
